import "../../node_modules/normalize.css/normalize.css";
import "../css/styles.scss";

const {ipcRenderer} = require("electron");

const $ = require("jquery");
const qr = require("qrcode");

function focusHeaderButtons() {
	$(".form .buttons div").toggleClass("focus");
}

ipcRenderer.on("hasLooseFocus", (event, looseFocus) => {
	focusHeaderButtons();
});

$(async () => {
	focusHeaderButtons();

	$("#minimizeButton").click(() => {
		ipcRenderer.send("minimize");
	});

	$("#maximizeButton").click(() => {
		ipcRenderer.send("maximize");
	});

	$("#closeButton").click(() => {
		ipcRenderer.send("close");
	});

	$("#btn").click(async () => {
		let qrCanvas = document.getElementById("qrCanvas");
		qr.toCanvas(qrCanvas,
			"https://www.npmjs.com/package/qrcode#options",
			{errorCorrectionLevel: "H"});

		qrCanvas.hidden = false;
	});
});
