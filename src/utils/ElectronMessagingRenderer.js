let ipcRenderer = window.require("electron").ipcRenderer;

export function send(message, ...args) {
	if (!ipcRenderer)
		throw new Error("No ipcRenderer");

	ipcRenderer.send(message, args);
}

export async function request(message, ...args) {
	return new Promise((resolve, reject) => {
		if (!ipcRenderer)
			reject("No ipcRenderer");

		ipcRenderer.once(message, (event, args) => {
			resolve(args);
		});

		send(message, ...args);
	});
}

export function registerRequest(message, callback) {
	if (!ipcRenderer)
		throw new Error("No ipcRenderer");

	ipcRenderer.on(message, async (event, args) => {
		let response = await callback(...args);
		event.sender.send(message, response);
	});
}
