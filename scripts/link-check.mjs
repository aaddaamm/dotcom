import { execFileSync } from 'node:child_process';

const SITE_URL = process.env.SITE_URL || 'https://adamrobinson.tech';

console.log(`Running link check against: ${SITE_URL}`);

execFileSync(
	'npx',
	[
		'-y',
		'linkinator',
		SITE_URL,
		'--recurse',
		'--silent',
		'--skip',
		'mailto:.*',
		'--skip',
		'tel:.*',
		'--skip',
		'https://(www\\.)?linkedin\\.com/.*',
		'--timeout',
		'15000',
		'--concurrency',
		'10'
	],
	{ stdio: 'inherit' }
);
