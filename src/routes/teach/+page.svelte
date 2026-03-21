<script lang="ts">
	const lesson = {
		title: 'Introduction to Programming',
		sections: [
			{
				title: 'Variables and Data Types',
				content:
					'Variables are containers for storing data values. In programming, we use variables to store and manipulate information.',
				codeExample: `// Declaring variables in JavaScript
let name = "Alice";    // String
let age = 25;          // Number
let isStudent = true;  // Boolean

console.log("Hello, " + name);
console.log("You are " + age + " years old");`
			},
			{
				title: 'Control Flow with Conditionals',
				content:
					'Conditional statements help your program make decisions based on certain conditions.',
				codeExample: `// Simple if-else statement
let hour = 14;
let greeting;

if (hour < 12) {
	greeting = "Good morning!";
} else if (hour < 18) {
	greeting = "Good afternoon!";
} else {
	greeting = "Good evening!";
}

console.log(greeting);  // Outputs: "Good afternoon!"`
			},
			{
				title: 'Working with Functions',
				content:
					'Functions allow you to group code that performs a specific task, making it reusable and more organized.',
				codeExample: `// Defining and calling a function
function calculateArea(width, height) {
	return width * height;
}

let roomWidth = 10;
let roomHeight = 15;
let area = calculateArea(roomWidth, roomHeight);

console.log("The room area is " + area + " square feet");`
			}
		]
	};

	let userCode = $state("// Write your code here\nconsole.log('Hello, world!');");
	let codeOutput = $state('');
	let isRunning = $state(false);
	let selectedSection = $state(0);

	let sandboxIframe: HTMLIFrameElement;

	function runCode() {
		isRunning = true;
		codeOutput = '';

		try {
			if (sandboxIframe) {
				sandboxIframe.remove();
			}

			sandboxIframe = document.createElement('iframe');
			sandboxIframe.setAttribute('sandbox', 'allow-scripts');
			sandboxIframe.style.display = 'none';
			document.body.appendChild(sandboxIframe);

			const logs: string[] = [];

			const handleMessage = (event: MessageEvent) => {
				if (event.source !== sandboxIframe.contentWindow) return;
				const { type, data } = event.data;
				if (type === 'log') {
					logs.push(data);
				} else if (type === 'result') {
					if (logs.length > 0) {
						codeOutput = logs.join('\n');
					} else if (data !== undefined && data !== 'undefined') {
						codeOutput = data;
					}
					isRunning = false;
					window.removeEventListener('message', handleMessage);
				} else if (type === 'error') {
					codeOutput = `Error: ${data}`;
					isRunning = false;
					window.removeEventListener('message', handleMessage);
				}
			};

			window.addEventListener('message', handleMessage);

			const sandboxCode = `
				<script>
					const originalLog = console.log;
					console.log = (...args) => {
						parent.postMessage({ type: 'log', data: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
					};
					try {
						const result = (function() { ${userCode} })();
						parent.postMessage({ type: 'result', data: result !== undefined ? String(result) : undefined }, '*');
					} catch (e) {
						parent.postMessage({ type: 'error', data: e.message }, '*');
					}
				</` + `script>
			`;

			sandboxIframe.srcdoc = sandboxCode;

			setTimeout(() => {
				if (isRunning) {
					codeOutput = 'Error: Code execution timed out';
					isRunning = false;
					window.removeEventListener('message', handleMessage);
				}
			}, 5000);
		} catch (error) {
			codeOutput = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
			isRunning = false;
		}
	}

	function loadExample(index: number) {
		if (confirm('Load the example code? This will replace your current code.')) {
			userCode = lesson.sections[index].codeExample;
		}
	}
</script>

<svelte:head>
	<title>Teach — Adam Robinson</title>
	<meta name="description" content="Interactive programming lessons by Adam Robinson." />
	<meta property="og:title" content="Teach — Adam Robinson" />
	<meta property="og:description" content="Interactive programming lessons by Adam Robinson." />
	<meta property="og:image" content="https://adamrobinson.tech/og-card.png" />
	<meta property="og:url" content="https://adamrobinson.tech/teach" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://adamrobinson.tech/teach" />
</svelte:head>

<div class="max-w-5xl mx-auto px-6 pt-20 sm:pt-28 pb-16">
	<a
		href="/"
		class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors"
	>
		<span aria-hidden="true">&larr;</span>
		Back
	</a>
	<h1 class="page-title text-3xl font-semibold tracking-tight mb-2">{lesson.title}</h1>
	<p class="page-description leading-relaxed mb-12">
		Interactive coding lessons to help you learn programming
	</p>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<div class="rounded-lg p-6 panel">
			<div class="mb-6">
				<div class="flex tab-bar">
					{#each lesson.sections as section, i}
						<button
							class="tab px-4 py-2 text-sm font-medium"
							class:tab-active={selectedSection === i}
							onclick={() => (selectedSection = i)}
						>
							{section.title}
						</button>
					{/each}
				</div>
			</div>

			<div>
				<h2 class="section-title text-xl font-semibold mb-3">{lesson.sections[selectedSection].title}</h2>
				<p class="body-text mb-6 leading-relaxed">
					{lesson.sections[selectedSection].content}
				</p>

				<div class="rounded-md p-4 mb-4 code-block">
					<div class="flex justify-between items-center mb-2">
						<h3 class="text-sm font-semibold muted-text">Example Code</h3>
						<button class="load-btn px-2 py-1 rounded text-sm" onclick={() => loadExample(selectedSection)}>
							Load Example
						</button>
					</div>
					<pre class="text-sm p-3 rounded overflow-x-auto code-pre"><code>{lesson.sections[selectedSection].codeExample}</code></pre>
				</div>
			</div>
		</div>

		<div class="rounded-lg p-6 panel">
			<h2 class="section-title text-xl font-semibold mb-4">Your Code</h2>
			<div class="mb-4">
				<textarea
					bind:value={userCode}
					class="editor w-full h-64 p-3 font-mono text-sm rounded resize-none"
					spellcheck="false"
				></textarea>
			</div>
			<div class="flex justify-end mb-4">
				<button
					class="run-btn rounded-lg px-6 py-2 text-sm font-semibold disabled:opacity-50 transition-colors"
					onclick={runCode}
					disabled={isRunning}
				>
					{isRunning ? 'Running...' : 'Run Code'}
				</button>
			</div>
			<div>
				<h3 class="section-title text-md font-semibold mb-2">Output:</h3>
				<pre class="output-pre h-40 p-3 rounded font-mono text-sm overflow-y-auto">{codeOutput}</pre>
			</div>
		</div>
	</div>

	<div class="mt-12 text-center">
		<p class="muted-text text-sm">
			This is a simple JavaScript playground. For security reasons, some features may be limited.
		</p>
	</div>
</div>

<style>
	pre {
		white-space: pre-wrap;
		word-break: break-word;
	}

	.back-link {
		color: var(--color-muted);
	}
	.back-link:hover {
		color: var(--color-accent);
	}
	.page-title {
		color: var(--color-text);
	}
	.page-description {
		color: var(--color-muted);
	}
	.section-title {
		color: var(--color-text);
	}
	.body-text {
		color: var(--color-text);
	}
	.muted-text {
		color: var(--color-muted);
	}
	.panel {
		border: 1px solid var(--color-border);
	}
	.tab-bar {
		border-bottom: 1px solid var(--color-border);
	}
	.tab {
		color: var(--color-muted);
		transition: color 150ms ease;
	}
	.tab:hover {
		color: var(--color-text);
	}
	.tab-active {
		color: var(--color-accent);
		border-bottom: 2px solid var(--color-accent);
	}
	.code-block {
		background-color: color-mix(in srgb, var(--color-border) 30%, var(--color-bg));
	}
	.code-pre {
		background-color: var(--color-bg);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.load-btn {
		color: var(--color-accent);
		border: 1px solid var(--color-border);
		transition: border-color 150ms ease;
	}
	.load-btn:hover {
		border-color: var(--color-accent);
	}
	.editor {
		background-color: var(--color-bg);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.editor:focus {
		border-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
		outline: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
	}
	.run-btn {
		background-color: var(--color-accent);
		color: white;
	}
	.run-btn:hover {
		background-color: color-mix(in srgb, var(--color-accent) 85%, white);
	}
	.output-pre {
		background-color: var(--color-bg);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
</style>
