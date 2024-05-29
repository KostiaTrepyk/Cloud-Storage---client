// Import necessary dependencies and modules
import JSZip from "jszip";
import { store } from "store/store";
import { foldersApi } from "services/foldersApi";
import { filesApi } from "services/filesApi";

// Function to download a folder asynchronously
export async function downloadFolder({
	storageId,
	folderId,
}: {
	storageId: number;
	folderId: number;
}) {
	const getFolderResponse = await store.dispatch(
		foldersApi.endpoints.getFolder.initiate({ storageId, folderId })
	);

	// Check if required data is available
	if (!getFolderResponse.isSuccess) return;

	const { currentFolder } = getFolderResponse.data;

	// Retrieve folder structure and initiate download
	const result = await setFolderStructure({
		storageId,
		folderId,
		folder: null,
	});

	// Start the download if the folder structure is available
	if (result) {
		await download({
			folder: result,
			name: currentFolder?.name ?? "Folder",
		});
	}
}

// Recursive function to build the folder structure for download
async function setFolderStructure({
	storageId,
	folderId,
	folder,
}: {
	storageId: number;
	folderId: number;
	folder: JSZip | null;
}) {
	// Fetch data for the current folder
	const getFolderResponse = await store.dispatch(
		foldersApi.endpoints.getFolder.initiate({ storageId, folderId })
	);

	const getFilesResponse = await store.dispatch(
		filesApi.endpoints.getFolderFiles.initiate({ storageId, folderId })
	);

	if (!getFolderResponse.isSuccess && !getFilesResponse.isSuccess) return;

	// Check if required data is available
	if (!getFolderResponse.data) return;

	// Create a new JSZip object if it doesn't exist
	if (!folder) {
		var zip = new JSZip();
		folder = zip.folder(
			getFolderResponse.data.currentFolder?.name ?? "Folder"
		);

		// Return if folder creation fails
		if (!folder) return;
	}

	// Create a subfolder for the current folder
	const currentFolder = folder.folder(
		getFolderResponse.data.currentFolder?.name ?? "Folder"
	);

	const { folders } = getFolderResponse.data;
	const files = getFilesResponse.data ?? [];

	// Return if subfolder creation fails
	if (!currentFolder) return;

	// Add files to the zip
	for (const file of files) {
		const res = await fetch(
			`http://localhost:5000/uploads/${file.filename}`
		);

		// If file is not found, add an error message to the zip
		if (!res.ok) {
			currentFolder.file(
				file.originalname + ".txt",
				"Can not download this file!"
			);
			continue;
		}

		// Read file content and add it to the zip
		const fileContent = res.body ? await res.body.getReader().read() : null;
		if (fileContent?.value)
			currentFolder.file(
				file.originalname +
					"." +
					file.filename.split(".")[
						file.filename.split(".").length - 1
					],
				fileContent.value
			);
		else {
			// Throw an error if no file content is found
			throw new Error("No file content found!");
		}
	}

	// Recursively call getFolder for each subfolder
	for (const subfolder of folders) {
		await setFolderStructure({
			storageId,
			folderId: subfolder.id,
			folder: currentFolder,
		});
	}

	// Return the folder structure
	return folder;
}

// Initiate the download of the generated zip file
async function download({
	folder,
	name,
}: {
	folder: JSZip;
	name: string;
}): Promise<void> {
	// Generate the zip content asynchronously
	await folder.generateAsync({ type: "blob" }).then(function (blob) {
		// Create a download link
		var link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = name + ".zip";
		// Append the link to the DOM and trigger the click event
		document.body.appendChild(link);
		link.click();
		// Remove the link from the DOM
		document.body.removeChild(link);
	});
}
