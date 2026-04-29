export type SeveranceMode = "outie" | "innie";

const STORAGE_KEY = "severance-mode";

let mode = $state<SeveranceMode>("outie");

function applyModeToDom(value: SeveranceMode) {
	if (typeof document === "undefined") return;
	document.documentElement.setAttribute("data-severance", value);
}

export function initSeveranceMode() {
	if (typeof window === "undefined") return;
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === "innie" || saved === "outie") {
		mode = saved;
	}
	applyModeToDom(mode);
}

export function getSeveranceMode() {
	return mode;
}

export function setSeveranceMode(value: SeveranceMode) {
	mode = value;
	if (typeof window !== "undefined") {
		window.localStorage.setItem(STORAGE_KEY, value);
	}
	applyModeToDom(value);
}
