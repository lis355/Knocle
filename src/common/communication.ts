import isElectron from "is-electron";

import Electron from "electron";

declare const window: any;
let ipcMain: Electron.IpcMain | null = null;
let ipcRenderer: Electron.IpcRenderer | null = null;
let isElectronRun = false;

export function isMain() {
	return !isElectronRun;
}

export function isRender() {
	return isElectronRun;
}

(function () {
	isElectronRun = isElectron();
	if (isRender())
		ipcRenderer = window.require("electron").ipcRenderer;
	// TODO make typescript avaliable on ipcMain and make ipc abstract class
	//else
	//	ipcMain = require("electron").ipcMain;
})();

export function sendElectronMessage(message: string, ...args: any[]) {
	ipcRenderer && ipcRenderer.send(message, args);
}

export function onElectronMessage(message: string, callback: any) {
	ipcRenderer && ipcRenderer.on(message, (event: any, args: any) => {
		callback(args);
	});
}
