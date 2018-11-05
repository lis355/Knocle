const ngrok = require("ngrok");

module.exports = class Tunnel {
	constructor() {
		this.__url = "";
	}

	getUrl() {
		return this.__url;
	}

	async open(query) {
		this.close();
		this.__url = await ngrok.connect(query);
	}

	async close() {
		if (this.__url)
			await ngrok.disconnect(this.__url);
	}
};
