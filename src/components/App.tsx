import React, {Component} from "react";

const qr = require("qrcode");

/*
const {ipcRenderer} = require("electron");

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
});
*/

class App extends Component {
	handleGenerate() {
		let qrCanvas = document.getElementById("qrCanvas");
		if (qrCanvas) {

			// TODO to data --> state
			qr.toCanvas(qrCanvas, "https://www.npmjs.com/package/qrcode#options", {errorCorrectionLevel: "H"});

			qrCanvas.hidden = false;
		}
	}

	render() {
		return (
			<div className="main">
				<div className={`form${process.env.NODE_ENV === "development" ? " form-debug" : ""}`}>
					<div className="header">
						<div className="toolbar"/>
						<div className="buttons">
							<div id="minimizeButton"/>
							<div id="maximizeButton"/>
							<div id="closeButton"/>
						</div>
					</div>
					<div className="delimeter"/>
					<div className="content">
						<button id="btn" className="btn btn-outline-success" onClick={this.handleGenerate}>Generate</button>
						<canvas id="qrCanvas" hidden/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
