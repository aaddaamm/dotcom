import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.svelte-kit/output/client/_app/immutable');

const MAX_TOTAL_JS = Number(process.env.BUDGET_TOTAL_JS || 220000);
const MAX_TOTAL_CSS = Number(process.env.BUDGET_TOTAL_CSS || 60000);
const MAX_SINGLE_JS = Number(process.env.BUDGET_SINGLE_JS || 100000);
const MAX_SINGLE_CSS = Number(process.env.BUDGET_SINGLE_CSS || 30000);

function walk(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walk(fullPath));
		else files.push(fullPath);
	}
	return files;
}

function summarize(files) {
	let total = 0;
	let largest = { path: '', size: 0 };
	for (const file of files) {
		const size = fs.statSync(file).size;
		total += size;
		if (size > largest.size) largest = { path: file, size };
	}
	return { total, largest };
}

if (!fs.existsSync(ROOT)) {
	console.error(`Build output not found at ${ROOT}. Run \`npm run build\` first.`);
	process.exit(1);
}

const files = walk(ROOT);
const jsFiles = files.filter((f) => f.endsWith('.js'));
const cssFiles = files.filter((f) => f.endsWith('.css'));

const js = summarize(jsFiles);
const css = summarize(cssFiles);

console.log(
	`JS: total=${js.total} bytes, largest=${js.largest.size} (${path.relative(process.cwd(), js.largest.path)})`
);
console.log(
	`CSS: total=${css.total} bytes, largest=${css.largest.size} (${path.relative(process.cwd(), css.largest.path)})`
);

const failures = [];
if (js.total > MAX_TOTAL_JS) failures.push(`Total JS ${js.total} exceeds budget ${MAX_TOTAL_JS}`);
if (css.total > MAX_TOTAL_CSS)
	failures.push(`Total CSS ${css.total} exceeds budget ${MAX_TOTAL_CSS}`);
if (js.largest.size > MAX_SINGLE_JS) {
	failures.push(`Largest JS chunk ${js.largest.size} exceeds budget ${MAX_SINGLE_JS}`);
}
if (css.largest.size > MAX_SINGLE_CSS) {
	failures.push(`Largest CSS chunk ${css.largest.size} exceeds budget ${MAX_SINGLE_CSS}`);
}

if (failures.length > 0) {
	console.error('\nBundle budget check failed:');
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log('Bundle budget check passed.');
