import React, {Component} from "react";

let classNames = require("classnames");
import * as ElectronMessaging from "../utils/ElectronMessagingRenderer";

import packageJson from "../../package.json";

interface Props {
}

interface State {
	focus: boolean
}

class Form extends Component<Props, State> {
	constructor(props: object) {
		super(props);

		this.state = {
			focus: false
		};
	}

	componentDidMount() {
		ElectronMessaging.answerMain("hasLooseFocus", (looseFocus: boolean) => {
			this.setState({focus: !looseFocus});
		});
	}

	handleMinimize() {
		ElectronMessaging.callMain("minimize");
	}

	handleMaximize() {
		ElectronMessaging.callMain("maximize");
	}

	handleClose() {
		ElectronMessaging.callMain("close");
	}

	render() {
		return (
			<div className="main">
				<div className="form">
					<div className="header">
						<div className="toolbar">
							<i>{`${packageJson.name} ${packageJson.version}`}</i>
						</div>
						<div className="buttons">
							<div id="minimizeButton" className={classNames({"focus": this.state.focus})} onClick={this.handleMinimize}/>
							<div id="maximizeButton" className={classNames({"focus": this.state.focus})} onClick={this.handleMaximize}/>
							<div id="closeButton" className={classNames({"focus": this.state.focus})} onClick={this.handleClose}/>
						</div>
					</div>
					<div className="delimeter"/>
					<div className="content" {...this.props}/>
				</div>
			</div>
		);
	}
}

export default Form;
