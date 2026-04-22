import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = Number(process.env.LH_PORT || 4173);
const PAGES = ['/', '/blog', '/work', '/hire', '/contact', '/play', '/terminal'];
const MIN_ACCESSIBILITY = Number(process.env.LH_MIN_ACCESSIBILITY || 0.96);
const MIN_SEO = Number(process.env.LH_MIN_SEO || 1);
const REPORT_DIR = process.env.LH_REPORT_DIR
	? path.resolve(process.env.LH_REPORT_DIR)
	: fs.mkdtempSync(path.join(os.tmpdir(), 'dotcom-lh-'));

if (!fs.existsSync(REPORT_DIR)) {
	fs.mkdirSync(REPORT_DIR, { recursive: true });
}

function pageName(route) {
	if (route === '/') return 'home';
	return route.replace(/^\//, '').replace(/\//g, '-');
}

function waitForServer(url, timeoutMs = 60000) {
	const started = Date.now();

	return new Promise((resolve, reject) => {
		function attempt() {
			const req = http.get(url, (res) => {
				res.resume();
				resolve();
			});

			req.on('error', () => {
				if (Date.now() - started > timeoutMs) {
					reject(new Error(`Preview server did not start within ${timeoutMs}ms`));
					return;
				}
				setTimeout(attempt, 750);
			});
		}

		attempt();
	});
}

function runLighthouse(url, outputPath) {
	execFileSync(
		'npx',
		[
			'-y',
			'lighthouse',
			url,
			'--quiet',
			'--chrome-flags=--headless=new --no-sandbox',
			'--only-categories=seo,accessibility',
			'--output=json',
			`--output-path=${outputPath}`
		],
		{ stdio: 'inherit' }
	);
}

function scorePercent(report, category) {
	return Math.round((report.categories[category]?.score ?? 0) * 100);
}

function topAccessibilityFailures(report, limit = 3) {
	return Object.values(report.audits)
		.filter(
			(audit) =>
				audit.scoreDisplayMode !== 'notApplicable' &&
				audit.scoreDisplayMode !== 'informative' &&
				audit.score !== null &&
				audit.score < 1
		)
		.slice(0, limit)
		.map((audit) => `${audit.id}: ${audit.title}`);
}

async function main() {
	const preview = spawn('npm', ['run', 'preview', '--', '--host', HOST, '--port', String(PORT)], {
		stdio: 'ignore',
		detached: true
	});

	const baseUrl = `http://${HOST}:${PORT}`;

	try {
		await waitForServer(baseUrl);

		console.log(
			`Running Lighthouse gate with thresholds: accessibility>=${MIN_ACCESSIBILITY * 100}, seo>=${MIN_SEO * 100}`
		);

		const failures = [];

		for (const route of PAGES) {
			const name = pageName(route);
			const url = `${baseUrl}${route}`;
			const outputPath = path.join(REPORT_DIR, `${name}.json`);

			runLighthouse(url, outputPath);

			const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
			const accessibility = scorePercent(report, 'accessibility');
			const seo = scorePercent(report, 'seo');

			console.log(`${route} => accessibility=${accessibility} seo=${seo}`);

			if ((report.categories.accessibility?.score ?? 0) < MIN_ACCESSIBILITY) {
				const topFailures = topAccessibilityFailures(report);
				const details = topFailures.length ? ` (${topFailures.join('; ')})` : '';
				failures.push(
					`${route}: accessibility ${accessibility} < ${MIN_ACCESSIBILITY * 100}${details}`
				);
			}
			if ((report.categories.seo?.score ?? 0) < MIN_SEO) {
				failures.push(`${route}: seo ${seo} < ${MIN_SEO * 100}`);
			}
		}

		if (failures.length > 0) {
			console.error('\nLighthouse gate failed:');
			for (const failure of failures) console.error(`- ${failure}`);
			console.error(`\nReports saved to: ${REPORT_DIR}`);
			process.exitCode = 1;
		}
	} finally {
		try {
			process.kill(-preview.pid, 'SIGTERM');
		} catch {
			// no-op
		}
	}
}

await main();
