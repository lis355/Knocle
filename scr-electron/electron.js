const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");

let mainWindow;
let application;

function createWindow() {
	mainWindow = new BrowserWindow({
		show: false,
		frame: false,
		autoHideMenuBar: true,
		width: 600,
		height: 400,
		minWidth: 600,
		minHeight: 400,
		transparent: true,
		icon: null
	});

	mainWindow.loadURL("http://localhost:9000");

	//mainWindow.setAlwaysOnTop(true);

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	mainWindow.on("focus", event => {
		mainWindow.webContents.send("hasLooseFocus", false);
	});
	mainWindow.on("blur", event => {
		mainWindow.webContents.send("hasLooseFocus", true);
	});

	mainWindow.on("resize", event => {
		const size = mainWindow.getBounds();
	});

	mainWindow.on("move", event => {
		const pos = mainWindow.getBounds();
	});

	ipcMain.on("minimize", () => {
		mainWindow.minimize();
	});

	ipcMain.on("maximize", () => {
		mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
	});

	ipcMain.on("close", () => {
		mainWindow.close();
	});

	// ipcMain.on('asynchronous-message', (event, arg) => {
	// 	console.log(arg) // prints "ping"
	// 	event.sender.send('asynchronous-reply', 'pong')
	// })
	//
	// ipcMain.on('synchronous-message', (event, arg) => {
	// 	console.log(arg) // prints "ping"
	// 	event.returnValue = 'pong'
	// })
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (application) application.stop();

	app.quit();
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
