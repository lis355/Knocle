import qrcode from "qrcode-generator";

export function getQrDataUrl(data: string) {
	let typeNumber: TypeNumber = 0;
	let errorCorrectionLevel: ErrorCorrectionLevel = "H";
	let qr = qrcode(typeNumber, errorCorrectionLevel);
	qr.addData(data);
	qr.make();
	let qrDataUrl = qr.createDataURL(5, 5);
	return qrDataUrl;
}
