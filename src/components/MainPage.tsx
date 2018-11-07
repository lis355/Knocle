import React, {Component} from "react";
import LinkItem from "./LinkItem"

interface Props {
}

interface State {
}

class MainPage extends Component<Props, State> {
	constructor(props: {}) {
		super(props);
	}

	render() {
		return (
			<LinkItem />
		);
	}
}

export default MainPage;
