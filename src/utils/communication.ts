import isElectron from "is-electron";

declare const window: any;
let ipcRenderer: any = null;
let isElectronRun = false;

export function isRender() {
	return isElectronRun;
}

(function () {
	isElectronRun = isElectron();
	if (isRender())
		ipcRenderer = window.require("electron").ipcRenderer;
})();

export function sendElectronMessage(message: string, ...args: any[]) {
	ipcRenderer && ipcRenderer.send(message, args);
}

export function onElectronMessage(message: string, callback: any) {
	ipcRenderer && ipcRenderer.on(message, callback);
}
