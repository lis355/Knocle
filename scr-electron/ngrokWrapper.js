const ngrok = require("ngrok");

(async () => {
	const url = await ngrok.connect(3000);


	await ngrok.disconnect(url);
})();
