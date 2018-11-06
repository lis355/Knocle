const Tunnel = require("./ngrokWrapper");
const ElectronMessaging = require("./ElectronMessagingMain");

module.exports = class Application {
	constructor(ipc) {
		this.__ipc = ipc;
		this.__tunnel = new Tunnel();
	}

	run() {
		ElectronMessaging.registerRequest("getUrl", /*async*/ (port) => {
			try {
				return 1;
				//await this.__tunnel.open(port);
				return this.__tunnel.getUrl();
			} catch (e) {
				return "Bad data";
			}
		});
	}

	stop() {
		this.__tunnel.close();
	}
};
