const {app, BrowserWindow, ipcMain} = require("electron");
const {client} = require("electron-connect");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		frame: false,
		autoHideMenuBar: true,
		width: 600,
		height: 400,
		minWidth: 600,
		minHeight: 400,
		transparent: true,
		icon: `./build/icon.png`
	});

	mainWindow.loadURL(`file:/ /${__dirname}/../dist/index.html`);
	mainWindow.setAlwaysOnTop(true);

	mainWindow.on("closed", function () {
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

	if (process.env.HOT_RELOAD)
		client.create(mainWindow);
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function () {
	if (mainWindow === null) {
		createWindow();
	}
});
