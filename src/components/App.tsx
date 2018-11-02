import React from "react";

const App = () => (
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
				<button id="btn" className="btn btn-outline-success">Generate</button>
				<canvas id="qrCanvas" hidden/>
			</div>
		</div>
	</div>
);

export default App;
