import React, {Component} from "react";

import qrcode from "qrcode-generator";

class MainPage extends Component<any, any> {
	constructor(props: object) {
		super(props);

		this.state = {};
	}

	handleGenerate = () => {
		// TODO to data --> state

		let typeNumber: TypeNumber = 0;
		let errorCorrectionLevel: ErrorCorrectionLevel = "H";
		let qr = qrcode(typeNumber, errorCorrectionLevel);
		qr.addData(Math.random().toString());
		qr.make();
		let qrDataUrl = qr.createDataURL(5, 5);
		this.setState({qrDataUrl: qrDataUrl});
	};

	render() {
		return [
			<button id="btn" className="btn btn-outline-success" onClick={this.handleGenerate}>Generate</button>,
			<div>{this.state.qrDataUrl && <img className="qrcode" src={this.state.qrDataUrl}/>}</div>
		];
	}
}

export default MainPage;
