import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = Number(process.env.LH_PORT || 4173);
const PAGES = ['/', '/blog', '/work', '/hire', '/contact', '/play', '/terminal'];
const MIN_ACCESSIBILITY = 1;
const MIN_SEO = 1;
const REPORT_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'dotcom-lh-'));

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

async function main() {
	const preview = spawn('npm', ['run', 'preview', '--', '--host', HOST, '--port', String(PORT)], {
		stdio: 'ignore',
		detached: true
	});

	const baseUrl = `http://${HOST}:${PORT}`;

	try {
		await waitForServer(baseUrl);

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
				failures.push(`${route}: accessibility ${accessibility} < ${MIN_ACCESSIBILITY * 100}`);
			}
			if ((report.categories.seo?.score ?? 0) < MIN_SEO) {
				failures.push(`${route}: seo ${seo} < ${MIN_SEO * 100}`);
			}
		}

		if (failures.length > 0) {
			console.error('\nLighthouse gate failed:');
			for (const failure of failures) console.error(`- ${failure}`);
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
