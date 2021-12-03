if (window.location.protocol === 'https:') {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
	}
// TODO: Add more stuff here....
	
}
