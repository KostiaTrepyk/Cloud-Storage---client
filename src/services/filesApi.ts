import { emptySplitApi } from "./emptySplitApi";
import { FileData, FileType, SortValue } from "./types";

export const filesApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getAllFiles: build.query<GetAllFilesResponse, GetAllFilesParams>({
			query: ({ token, ...params }) => ({
				url: "/files/all",
				method: "GET",
				params,
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files"],
		}),

		getFolderFiles: build.query<
			GetFolderFilesResponse,
			GetFolderFilesParams
		>({
			query: ({ token, ...params }) => ({
				url: "/files/folderFiles",
				method: "GET",
				params,
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files"],
		}),

		uploadFile: build.mutation<UploadFileResponse, UploadFileBody>({
			query: ({ token, ...body }) => {
				const formData = new FormData();
				formData.append("file", body.file);
				formData.append("storageId", String(body.storageId));
				formData.append("folderId", String(body.folderId));

				return {
					url: "/files/save",
					method: "POST",

					body: formData,
					headers: {
						Authorization: "Bearer " + token,
					},
					timeout: 1000 * 60, // 1min,
				};
			},
			invalidatesTags: ["Files"],
		}),

		updateFile: build.mutation<UpdateFileResponse, UpdateFileBody>({
			query: ({ token, ...body }) => ({
				url: "/files/one",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files"],
		}),

		softDeleteFile: build.mutation<
			SoftDeleteFileResponse,
			SoftDeleteFileBody
		>({
			query: ({ ids, token }) => ({
				url: "/files/softDelete",
				method: "DELETE",
				params: {
					ids: ids.join(", "),
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files"],
		}),

		deleteFile: build.mutation<DeleteFileResponse, DeleteFileParams>({
			query: ({ ids, token }) => ({
				url: "/files/delete",
				method: "DELETE",
				params: {
					ids: ids.join(", "),
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files"],
		}),
	}),
	overrideExisting: false,
});

/* GetAllFiles */
export interface GetAllFilesResponse {
	files: FileData[];
	count: number;
	isLastPage: boolean;
	page: number;
}

export interface GetAllFilesParams {
	filesType?: FileType;
	offset?: number;
	limit?: number;
	sort?: SortValue;
	search?: string;
	createdAt?: string;
	token: string | undefined;
}

/* GetFolderFiles */
export type GetFolderFilesResponse = FileData[];

export interface GetFolderFilesParams {
	folderId?: number;
	storageId: number;
	token: string | undefined;
}

/* UploadFile */
export interface UploadFileResponse extends FileData {}

export interface UploadFileBody {
	storageId: number;
	folderId?: number;
	file: File;
	token: string | undefined;
}

/* UpdateFile */
export type UpdateFileResponse = boolean;

export interface UpdateFileBody {
	id: number;
	newOriginalName?: string;
	newFolderId?: number;
	isFavourite?: boolean;
	token: string | undefined;
}

/* SoftDeleteFile */
export type SoftDeleteFileResponse = boolean;

export interface SoftDeleteFileBody {
	ids: number[];
	token: string | undefined;
}

/* deleteFile */
export type DeleteFileResponse = boolean;

export interface DeleteFileParams {
	ids: number[];
	token: string | undefined;
}