import React, {Component} from "react";
import * as ElectronMessaging from "../utils/ElectronMessagingRenderer";
import {getQrDataUrl} from "../utils/qrGenerator";
const $ = require("jquery");

interface Props {
}

interface State {
	url?: string,
	qrDataUrl?: string
}

class LinkItem extends Component<Props, State> {
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
		return (
			<div className="link-item">
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><i>https://localhost</i></span>
					</div>
					<input type="number" className="form-control" defaultValue="8080"/>
					<div className="input-group-append">
						<button className="btn btn-outline-success" type="button" onClick={this.handleGenerate}>Generate</button>
					</div>
				</div>
				<div>
					{this.state.url && <p>{this.state.url}</p>}
					{this.state.qrDataUrl && <img className="qrcode" src={this.state.qrDataUrl}/>}
				</div>

				<p>
					<a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
						Link with href
					</a>
					<button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
						Button with data-target
					</button>
				</p>
				<div className="collapse" id="collapseExample">
					<div className="card card-body">
						Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
					</div>
				</div>


				<button className="btn" onClick={() => $(".collapse").collapse()}>Collapsible</button>

				<div id="demo" className="collapse">
					Some text..
				</div>
			</div>
		);
	}
}

export default LinkItem;
