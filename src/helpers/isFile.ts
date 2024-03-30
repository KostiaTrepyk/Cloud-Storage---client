import { type FileData, type FolderData } from "services/types";

export function isFile(item: FileData | FolderData): item is FileData {
	if ((item as FileData).filename === undefined) return false;

	return true;
}