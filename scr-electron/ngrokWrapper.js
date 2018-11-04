const ngrok = require("ngrok");

(async () => {
	// let r = await ngrok.connect("fds");
	//
	// console.log(r);

})();


module.exports = class Tunnel {
	constructor() {
		this.__url = "";
	}

	getUrl() {
		return this.__url;
	}

	async open(query) {
		this.close();
		try {
			this.__url = await ngrok.connect(query);
		} catch (e) {
			console.log("bad parameters");
		}
	}

	async close() {
		if (this.__url)
			await ngrok.disconnect(this.__url);
	}
};
