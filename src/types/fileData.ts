export interface FileData {
	id: number;
	filename: string;
	originalname: string;
	size: number;
	mimetype: string;
	deletedAt: Date | null;
}

export type FileType = "all" | "photos" | "trash" | 'applications';