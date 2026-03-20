<script lang="ts">
	import { onMount } from 'svelte';

	// Sample lesson content
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

	let userCode = "// Write your code here\nconsole.log('Hello, world!');";
	let codeOutput = '';
	let isRunning = false;
	let selectedSection = 0;

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
				<\/script>
			`;

			sandboxIframe.srcdoc = sandboxCode;

			// Timeout fallback
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

	onMount(() => {
		// Any initialization if needed
	});
</script>

<svelte:head>
	<title>Teach - Adam Robinson</title>
	<meta name="description" content="Interactive programming lessons by Adam Robinson" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<header class="mb-8 text-center">
		<h1 class="text-3xl font-bold">{lesson.title}</h1>
		<p class="mt-2">Interactive coding lessons to help you learn programming</p>
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Left side: Lesson content -->
		<div class="rounded-lg shadow-md p-6">
			<div class="mb-6">
				<div class="flex border-b border-gray-200">
					{#each lesson.sections as section, i}
						<button
							class={`px-4 py-2 text-sm font-medium ${
								selectedSection === i
									? 'text-blue-600 border-b-2 border-blue-600'
									: 'text-gray-500 hover:text-gray-700'
							}`}
							on:click={() => (selectedSection = i)}
						>
							{section.title}
						</button>
					{/each}
				</div>
			</div>

			<div class="lesson-content">
				<h2 class="text-xl font-bold mb-3">{lesson.sections[selectedSection].title}</h2>
				<p class="mb-6 leading-relaxed">
					{lesson.sections[selectedSection].content}
				</p>

				<div class="rounded-md p-4 mb-4">
					<div class="flex justify-between items-center mb-2">
						<h3 class="text-sm font-semibol">Example Code</h3>
						<button class="btn px-2 py-1 rounded" on:click={() => loadExample(selectedSection)}>
							Load Example
						</button>
					</div>
					<pre class="text-sm bg-gray-800 text-white p-3 rounded overflow-x-auto"><code>{lesson
								.sections[selectedSection].codeExample}</code></pre>
				</div>
			</div>
		</div>

		<!-- Right side: Interactive coding area -->
		<div class="rounded-lg shadow-md p-6">
			<h2 class="text-xl font-bold mb-4">Your Code</h2>
			<div class="mb-4">
				<textarea
					bind:value={userCode}
					class="w-full h-64 p-3 font-mono text-sm bg-gray-800 text-white rounded resize-none"
					spellcheck="false"
				></textarea>
			</div>
			<div class="flex justify-end mb-4">
				<button
					class="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
					on:click={runCode}
					disabled={isRunning}
				>
					{isRunning ? 'Running...' : 'Run Code'}
				</button>
			</div>
			<div>
				<h3 class="text-md font-bold mb-2">Output:</h3>
				<pre
					class="h-40 bg-gray-800 border border-gray-700 p-3 rounded font-mono text-sm overflow-y-auto">{codeOutput}</pre>
			</div>
		</div>
	</div>

	<div class="mt-12 text-center">
		<p class="text-gray-600">
			This is a simple JavaScript playground. For security reasons, some features may be limited.
		</p>
	</div>
</div>

<style>
	/* Add any additional styles if needed */
	pre {
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
