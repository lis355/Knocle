import React, {Component} from "react";

const qr = require("qrcode");

class MainPage extends Component<any, any> {
	constructor(props: object) {
		super(props);
	}

	handleGenerate() {
		let qrCanvas = document.getElementById("qrCanvas");
		if (qrCanvas) {

			// TODO to data --> state
			qr.toCanvas(qrCanvas, "https://www.npmjs.com/package/qrcode#options", {errorCorrectionLevel: "H"});

			qrCanvas.hidden = false;
		}
	}

	render() {
		return [
			<button id="btn" className="btn btn-outline-success" onClick={this.handleGenerate}>Generate</button>,
			<canvas id="qrCanvas" hidden/>
		];
	}
}

export default MainPage;
