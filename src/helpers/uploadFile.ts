import { type UploadFileBody } from "services/filesApi";

/**
 * Initiates the file upload process by creating a dynamic file input element,
 * triggering file selection, and using the provided function to start the upload.
 *
 * @param uploadFile - Function to initiate the file upload process.
 * @param folderId - Optional folder ID where the file should be uploaded.
 * @param storageId - The storage ID where the file should be uploaded.
 */
export function uploadFile({
	uploadFile,
	folderId,
	storageId,
}: {
	uploadFile: (data: UploadFileBody) => Promise<unknown>;
	folderId?: number;
	storageId: number;
}) {
	// Create a dynamic file input element
	const input = document.createElement("input");
	input.setAttribute("type", "file");

	// Set up an event listener for file selection
	input.onchange = async () => {
		// Check if files were selected
		if (!input.files || !input.files[0]) return;

		// Retrieve the selected file and initiate the file upload
		await uploadFile({
			folderId,
			storageId,
			file: input.files[0],
		});
	};

	
	// Append the input element to the document body and trigger a click to open the file selection dialog
	document.body.appendChild(input);
	input.click();

	// Remove the dynamically created input element from the DOM after file selection
	input.parentNode?.removeChild(input);
}
