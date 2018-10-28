import "normalize.css";

import "./../css/styles.scss";

const $ = require("jquery");

const qr = require("qrcode");

$(() => {
	$("#btn").click(() => {
		let qrCanvas = document.getElementById("qrCanvas");
		qr.toCanvas(qrCanvas,
			"https://www.npmjs.com/package/qrcode#options",
			{errorCorrectionLevel: "H"});

		qrCanvas.hidden = false;
	});
});
