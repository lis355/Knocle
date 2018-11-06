const Tunnel = require("./ngrokWrapper");
const ElectronMessaging = require("./utils/ElectronMessagingMain");

module.exports = class Application {
	constructor() {
		this.__tunnel = new Tunnel();
	}

	run() {
		ElectronMessaging.answerRenderer("getUrl", async (port) => {
			try {
				await this.__tunnel.open(port);
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
