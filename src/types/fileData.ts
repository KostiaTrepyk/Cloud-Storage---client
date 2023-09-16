import { UserData } from "./user";

export interface FileData {
	id: number;
	filename: string;
	originalname: string;
	size: number;
	mimetype: string;
	isFavourite: boolean;
	deletedAt: Date | null;
	createdAt: Date;
	sharedWith: UserData[];
}

export type FileType = "all" | "photos" | "trash" | "applications";
export type SortValue = "NO" | 'ASC' | "DESC"