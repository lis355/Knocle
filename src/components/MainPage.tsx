import React, {Component} from "react";

import {getQrDataUrl} from "../utils/qrGenerator";
import {onElectronMessage, sendElectronMessage} from "../common/communication";

interface Props {

}

interface State {
	url?: string,
	qrDataUrl?: string
}

class MainPage extends Component<Props, State> {
	constructor(props: {}) {
		super(props);

		this.state = {};

		onElectronMessage("url", (url: any) => {
			console.log(url);
			this.setState({url: url, qrDataUrl: getQrDataUrl(url)});
		});
	}

	handleGenerate = () => {
		sendElectronMessage("getUrl", 9000);
	};

	render() {
		return [
			<button id="btn" className="btn btn-outline-success" onClick={this.handleGenerate}>Generate</button>,
			<div>
				{this.state.url && <p>{this.state.url}</p>}
				{this.state.qrDataUrl && <img className="qrcode" src={this.state.qrDataUrl}/>}
			</div>
		];
	}
}

export default MainPage;
