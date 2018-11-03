export default function () {
	let typeNumber: TypeNumber = 0;
	let errorCorrectionLevel: ErrorCorrectionLevel = "H";
	let qr = qrcode(typeNumber, errorCorrectionLevel);
	qr.addData(Math.random().toString());
	qr.make();
	let qrDataUrl = qr.createDataURL(5, 5);
	return qrDataUrl;
}
