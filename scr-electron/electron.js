const {app, BrowserWindow} = require("electron");
const ElectronMessaging = require("./utils/ElectronMessagingMain");
const Application = require("./Application");

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

	mainWindow.on("closed", function () {
		mainWindow = null;
	});

	mainWindow.on("focus", event => {
		ElectronMessaging.callRenderer(mainWindow, "hasLooseFocus", false);
	});

	mainWindow.on("blur", event => {
		ElectronMessaging.callRenderer(mainWindow, "hasLooseFocus", true);
	});

	mainWindow.on("resize", event => {
		const size = mainWindow.getBounds();
	});

	mainWindow.on("move", event => {
		const pos = mainWindow.getBounds();
	});

	ElectronMessaging.answerRenderer("minimize", () => {
		mainWindow.minimize();
	});

	ElectronMessaging.answerRenderer("maximize", () => {
		mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
	});

	ElectronMessaging.answerRenderer("close", () => {
		mainWindow.close();
	});

	application = new Application();
	application.run();
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		if (application)
			application.stop();

		app.quit();
	}
});

app.on("activate", function () {
	if (mainWindow === null) {
		createWindow();
	}
});
