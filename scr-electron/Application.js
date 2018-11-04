const Tunnel = require("./ngrokWrapper");

module.exports = class Application {
	constructor(ipc) {
		this.__ipc = ipc;
		this.__tunnel = new Tunnel();
	}

	run() {
		this.__ipc.on("getUrl", async (event, arg) => {
			await this.__tunnel.open(arg[0]);
			event.sender.send("url", this.__tunnel.getUrl());
		});
	}

	stop() {
		this.__tunnel.close();
	}
};
