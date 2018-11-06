const electron = window.require("electron");
const ipc = electron.ipcRenderer;

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

export function callMain(channel, data) {
	return new Promise((resolve, reject) => {
		const {sendChannel, dataChannel, errorChannel} = getResponseChannels(channel);

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

		ipc.send(sendChannel, data);
	});
}

export function answerMain(channel, callback) {
	const window = electron.remote.getCurrentWindow();
	const {sendChannel, dataChannel, errorChannel} = getRendererResponseChannels(window.id, channel);

	ipc.on(sendChannel, async (event, data) => {
		try {
			ipc.send(dataChannel, await callback(data));
		} catch (err) {
			ipc.send(errorChannel, err);
		}
	});
}
