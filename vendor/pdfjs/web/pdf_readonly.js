// Read Only Preferences
const disableRghtClck = window.pdfjs.disableRghtClck || true; // Disable Right Click,   value: true || false
const disableCopyText = window.pdfjs.disableCopyText || true; // Disable Copy Text,     value: true || false
const disableOpenFile = window.pdfjs.disableOpenFile || true; // Disable Open PDF,      value: true || false
const disablePrintPdf = window.pdfjs.disablePrintPdf || true; // Disable Print PDF,     value: true || false
const disableDownload = window.pdfjs.disableDownload || true; // Disable Save PDF,      value: true || false
const disablePresents = window.pdfjs.disablePresents || true; // Disable Presentation,  value: true || false
const disablePrntScrn = window.pdfjs.disablePrntScrn || true; // Disable Print Screen,  value: true || false (experimental)

function getScript(source, callback) {
	var script = document.createElement('script');
	var prior = document.getElementsByTagName('script')[0];
	// script.async = 1;

	script.onload = script.onreadystatechange = function (_, isAbort) {
		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
			script.onload = script.onreadystatechange = null;
			script = undefined;

			if (!isAbort && callback) setTimeout(callback, 0);
		}
	};

	script.src = source;
	prior.parentNode.insertBefore(script, prior);
}

const viewerJSLoadedEvent = window.pdfjs.viewerJSLoadedEvent || 'viewerJSLoaded';
const viewerJSCallback = window.pdfjs.viewerJSCallback || function(){ window.dispatchEvent(new Event(viewerJSLoadedEvent)); };

let viewerJS = window.pdfjs.viewerJsUrl || "viewer.js";

// Load Specific viewer.js
if (disablePrintPdf) {
	viewerJS = window.pdfjs.viewerNoPrintJsUrl || 'viewer_noprint.js';
}

// Get the script
getScript(viewerJS, viewerJSCallback); 


// Stop Print Screen
function stopPrntScr() {
	var inpFld = document.createElement("input");
	inpFld.setAttribute("value", ".");
	inpFld.setAttribute("width", "0");
	inpFld.style.height = "0px";
	inpFld.style.width = "0px";
	inpFld.style.border = "0px";
	document.body.appendChild(inpFld);
	inpFld.select();
	document.execCommand("copy");
	inpFld.remove(inpFld);
}

// Clear Clipboard
function ClearClipboardData() {
	try {
		window.clipboardData.setData('text', "Access Restricted");
	} catch (err) {}
}

function generalKeys(e) {
	// Disable Copy Text Shortcut (Ctrl + S)
	if ((e.ctrlKey || e.metaKey) && (e.keyCode == 67)) {
		if (disableCopyText) {
			// alert('Copy text is forbidden!'); 
			e.preventDefault();
			ClearClipboardData();
		}
	}
	// Disable Open File Shortcut (Ctrl + O)
	if ((e.ctrlKey || e.metaKey) && (e.keyCode == 79)) {
		if (disableOpenFile) {
			//alert('Open file is forbidden!'); 
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
	// Disable Print PDF Shortcut (Ctrl + P)
	if ((e.ctrlKey || e.metaKey) && (e.keyCode == 80)) {
		if (disablePrintPdf) {
			// alert('Print PDF is forbidden!'); 
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
	// Disable Save PDF Shortcut (Ctrl + S)
	if ((e.ctrlKey || e.metaKey) && (e.keyCode == 83)) {
		if (disableDownload) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
}

// Disable Print Screen Button
document.addEventListener("keyup", function (e) {
	var keyCode = e.keyCode ? e.keyCode : e.which;
	if (keyCode == 44) {
		if (disablePrntScrn) {
			stopPrntScr();
		}
	}
});


document.addEventListener("keyup", function (e) {
	generalKeys(e);
});

document.addEventListener("keydown", function (e) {
	generalKeys(e);
});

document.addEventListener('DOMContentLoaded', function () {
	// Clear Print Screen Clipboard
	if (disablePrntScrn) {
		// setInterval(ClearClipboardData(), 300);
	}
	// Clear Copy Text Clipboard
	if (disableCopyText) {
		// setInterval(ClearClipboardData(), 300);
	}
	// Disable Right Click (Context Menu)
	if (disableRghtClck) {
		document.addEventListener('contextmenu', function (e) {
			e.preventDefault();
		}, false);
	}
	// Disable Open File Button
	if (disableOpenFile) {
		if (document.querySelector("#openFile")) {
			document.querySelector("#openFile").classList.add("hidden");
		}

		if (document.querySelector("#secondaryOpenFile")) {
			document.querySelector("#secondaryOpenFile").classList.add("hidden");
		}
	}
	// Disable Print PDF Button
	if (disablePrintPdf) {
		let style = document.createElement("style");
		style.setAttribute("media", "print");
		style.innerText = "* { display: none !important";
		document.head.appendChild(style);

		if (document.querySelector("#print")) {
			document.querySelector("#print").classList.add("hidden");
		}

		if (document.querySelector("#secondaryPrint")) {
			document.querySelector("#secondaryPrint").classList.add("hidden");
		}
	}
	// Disable Download Button
	if (disableDownload) {
		if (document.querySelector("#download")) {
			document.querySelector("#download").classList.add("hidden");
		}

		if (document.querySelector("#secondaryDownload")) {
			document.querySelector("#secondaryDownload").classList.add("hidden");
		}
	}
	// Disable Presentation Button
	if (disablePresents) {
		if (document.querySelector("#presentationMode")) {
			document.querySelector("#presentationMode").classList.add("hidden");
		}

		if (document.querySelector("#secondaryPresentationMode")) {
			document.querySelector("#secondaryPrint").classList.add("hidden");
		}
	}
});