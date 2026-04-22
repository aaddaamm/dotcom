import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve('src/content/blog/drafts');

if (!fs.existsSync(ROOT)) {
	console.error(`Draft directory not found: ${ROOT}`);
	process.exit(1);
}

const entries = fs
	.readdirSync(ROOT)
	.filter((file) => file.endsWith('.md'))
	.sort((a, b) => a.localeCompare(b));

const checks = [
	{
		name: 'title',
		test: (data) => typeof data.title === 'string' && data.title.trim().length >= 8,
		hint: 'title should be at least 8 characters'
	},
	{
		name: 'description',
		test: (data) => typeof data.description === 'string' && data.description.trim().length >= 20,
		hint: 'description should be at least 20 characters'
	},
	{
		name: 'date',
		test: (data) => typeof data.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.date),
		hint: "date should be 'YYYY-MM-DD'"
	},
	{
		name: 'tags',
		test: (data) => Array.isArray(data.tags) && data.tags.length >= 2,
		hint: 'tags should include at least 2 items'
	},
	{
		name: 'status',
		test: (data) => ['draft', 'review', 'ready'].includes(data.status),
		hint: "status should be one of: 'draft' | 'review' | 'ready'"
	},
	{
		name: 'reviewed',
		test: (data) => typeof data.reviewed === 'boolean',
		hint: 'reviewed should be true/false'
	}
];

let failingFiles = 0;

for (const file of entries) {
	const full = path.join(ROOT, file);
	const raw = fs.readFileSync(full, 'utf8');
	if (!raw.trimStart().startsWith('---')) continue;
	const { data, content } = matter(raw);

	const issues = [];
	for (const check of checks) {
		if (!check.test(data)) issues.push(`${check.name}: ${check.hint}`);
	}

	const wordCount = content.trim().length > 0 ? content.trim().split(/\s+/).length : 0;
	if (wordCount < 250) {
		issues.push(`content: draft is short (${wordCount} words), target >= 250`);
	}

	if (issues.length > 0) {
		failingFiles += 1;
		console.log(`\n${file}`);
		for (const issue of issues) {
			console.log(` - ${issue}`);
		}
	}
}

if (failingFiles === 0) {
	console.log('All drafts passed readiness checks.');
	process.exit(0);
}

console.log(`\n${failingFiles} draft file(s) need metadata/content cleanup.`);

if (process.env.BLOG_DRAFTS_STRICT === 'true') {
	process.exit(1);
}
