export interface UserData {
	id: number;
	fullName: string;
	email: string;
	createdAt: string;
}

export interface UserStatistic {
	user: UserData;
	filesCount: number;
	averageFileSize: number;
	totalFileSize: number;
}