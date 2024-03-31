interface DownloadFileData{
	path: string, 
	name: string, 
	extension: string 
}

export async function downloadFile ({path, name, extension}: DownloadFileData){
	await fetch(path, {
		method: "GET",
		headers: { "Content-Type": "application/pdf" },
	})
		.then((response) => response.blob())
		.then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]));

			const link = document.createElement("a");
			link.href = url;
			link.download = name + "." + extension;

			document.body.appendChild(link);

			link.click();

			link.parentNode?.removeChild(link);
		});
}