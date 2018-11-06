let ipcMain = require("electron").ipcMain;

function send(window, message, ...args) {
	window.webContents.send(message, args);
}

module.exports = {
	send: send,
	request: async function request(window, message, ...args) {
		return new Promise((resolve, reject) => {
			if (!ipcMain)
				reject("No ipcMain");

			ipc.once(message, (event, args) => {
				resolve(args);
			});

			send(window, message, ...args);
		});
	},
	registerRequest: function registerRequest(message, callback) {
		if (!ipcMain)
			throw new Error("No ipcMain");

		ipc.on(message, async (event, args) => {
			let response = await callback(...args);
			event.sender.send(message, response);
		});
	}
};
