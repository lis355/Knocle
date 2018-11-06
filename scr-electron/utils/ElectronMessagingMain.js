const electron = require("electron");
const {ipcMain: ipc, BrowserWindow} = electron;

let getResponseChannels = channel => ({
	sendChannel: `%better-ipc-send-channel-${channel}`,
	dataChannel: `%better-ipc-response-data-channel-${channel}`,
	errorChannel: `%better-ipc-response-error-channel-${channel}`
});

let getRendererResponseChannels = (windowId, channel) => ({
	sendChannel: `%better-ipc-send-channel-${windowId}-${channel}`,
	dataChannel: `%better-ipc-response-data-channel-${windowId}-${channel}`,
	errorChannel: `%better-ipc-response-error-channel-${windowId}-${channel}`
});

module.exports = {
	callRenderer: function (window, channel, data) {
		return new Promise((resolve, reject) => {
			const {sendChannel, dataChannel, errorChannel} = getRendererResponseChannels(window.id, channel);

			const cleanup = () => {
				ipc.removeAllListeners(dataChannel);
				ipc.removeAllListeners(errorChannel);
			};

			ipc.on(dataChannel, (event, result) => {
				cleanup();
				resolve(result);
			});

			ipc.on(errorChannel, (event, error) => {
				cleanup();
				reject(error);
			});

			if (window.webContents) {
				window.webContents.send(sendChannel, data);
			}
		});
	},
	answerRenderer: function (channel, callback) {
		const {sendChannel, dataChannel, errorChannel} = getResponseChannels(channel);

		ipc.on(sendChannel, async (event, data) => {
			const window = BrowserWindow.fromWebContents(event.sender);

			const send = (channel, data) => {
				if (!(window && window.isDestroyed())) {
					event.sender.send(channel, data);
				}
			};

			try {
				send(dataChannel, await callback(data, window));
			} catch (error) {
				send(errorChannel, error);
			}
		});
	},
	sendToRenderers: function (channel, data) {
		for (const window of BrowserWindow.getAllWindows()) {
			if (window.webContents) {
				window.webContents.send(channel, data);
			}
		}
	}
};
