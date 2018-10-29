const ngrok = require("ngrok");

(async () => {
	const url = await ngrok.connect(9090);


	await ngrok.disconnect(url);
})();
