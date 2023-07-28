export interface File {
	id: number;
	filename: string;
	originalname: string;
	size: number;
	mimetype: string;
	deletedAt: Date | null;
}