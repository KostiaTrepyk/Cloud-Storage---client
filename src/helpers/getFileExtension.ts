export function getFileExtension(filename: string): string | null{
	const fileExtension = filename.split(".").pop();

	if (!fileExtension) return null;
	return fileExtension;
}