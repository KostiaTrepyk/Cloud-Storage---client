import { FileData } from "./fileData";

export interface UserData {
	id: number;
	fullName: string;
	email: string;
	createdAt: string;
}

export interface UserDataWithSharedFiles {
	id: number;
	fullName: string;
	email: string;
	createdAt: string;
	sharedFiles: FileData[]
}

export interface UserStatistic {
	user: UserData;
	filesCount: number;
	averageFileSize: number;
	totalFileSize: number;
}