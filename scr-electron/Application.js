const Tunnel = require("./ngrokWrapper");

module.exports = class Application {
	constructor(ipc) {
		this.__ipc = ipc;
		this.__tunnel = new Tunnel();
	}

	run() {
		this.__ipc.on("getUrl", async (event, arg) => {
			let response;
			try {
				await this.__tunnel.open(arg[0]);
				response = this.__tunnel.getUrl();
			} catch (e) {
				response = "Bad data";
			}

			event.sender.send("url", response);
		});
	}

	stop() {
		this.__tunnel.close();
	}
};
