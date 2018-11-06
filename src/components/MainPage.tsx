import React, {Component} from "react";

import * as ElectronMessaging from "../utils/ElectronMessagingRenderer";

import {getQrDataUrl} from "../utils/qrGenerator";

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
	}

	handleGenerate = async () => {
		let url: any = await ElectronMessaging.callMain("getUrl", 9000);
		console.log(url);
		this.setState({url: url, qrDataUrl: getQrDataUrl(url)});
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
