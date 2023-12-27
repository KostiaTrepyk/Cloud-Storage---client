export type FileType = "all" | "photos" | "trash" | "applications";
export type SortValue = "NO" | "ASC" | "DESC";

export interface UserData {
	id: number;
	fullName: string;
	email: string;
	createdAt: string;
}

export interface UserDataWithSharedFiles extends UserData {
	sharedFiles: FileData[];
}

export interface UserStatistic {
	user: UserData;
	statistic: {
		filesCount: number;
		averageFileSize: number;
		totalFileSize: number;
	};
}

export interface StorageData {
	id: number;
	name: string;
	createdAt: string;
	size: number;
}

export interface FolderData {
	id: number;
	name: string;
	createdAt: string;
	parrentFolderId: number;
}

export interface FileData {
	id: number;
	filename: string;
	originalname: string;
	size: number;
	mimetype: string;
	isFavourite: boolean;
	deletedAt: Date | null;
	createdAt: Date;
}

export interface FileDataWithSharedWith extends FileData {
	sharedWith: UserData[];
}



