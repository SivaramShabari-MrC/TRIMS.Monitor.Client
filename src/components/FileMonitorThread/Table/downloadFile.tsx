export default function DownloadFile(fileName: any, data: any, type: any) {
	const fileData = JSON.stringify(data);
	const blob = new Blob([fileData], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = fileName;
	link.href = url;
	link.click();
}
