const {app, BrowserWindow} = require("electron");
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

	mainWindow.loadURL(`file:/ /${__dirname}/dist/index.html`);
	//mainWindow.setAlwaysOnTop(true);

	mainWindow.on("closed", function () {
		mainWindow = null;
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

