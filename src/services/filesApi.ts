import { emptySplitApi } from "./emptySplitApi";
import { FileData, FileType, SortValue } from "./types";

export const filesApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getAllFiles: build.query<GetAllFilesResponse, GetAllFilesParams>({
			query: (params) => ({
				url: "/files/all",
				method: "GET",
				params,
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files"],
		}),

		getFolderFiles: build.query<
			GetFolderFilesResponse,
			GetFolderFilesParams
		>({
			query: (params) => ({
				url: "/files/folderFiles",
				method: "GET",
				params,
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files"],
		}),

		uploadFile: build.mutation<UploadFileResponse, UploadFileBody>({
			query: (body) => {
				const formData = new FormData();
				formData.append("file", body.file);
				formData.append("storageId", String(body.storageId));
				formData.append("folderId", String(body.folderId));

				return {
					url: "/files/save",
					method: "POST",
					body: formData,
					timeout: 1000 * 60, // 1min,
				};
			},
			invalidatesTags: ["Files"],
		}),

		updateFile: build.mutation<UpdateFileResponse, UpdateFileBody>({
			query: (body) => ({
				url: "/files/one",
				method: "PUT",
				body,
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files"],
		}),

		softDeleteFile: build.mutation<
			SoftDeleteFileResponse,
			SoftDeleteFileBody
		>({
			query: ({ ids }) => ({
				url: "/files/softDelete",
				method: "DELETE",
				params: {
					ids: ids.join(", "),
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files"],
		}),

		deleteFile: build.mutation<DeleteFileResponse, DeleteFileParams>({
			query: ({ ids }) => ({
				url: "/files/delete",
				method: "DELETE",
				params: {
					ids: ids.join(", "),
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
}

/* GetFolderFiles */
export type GetFolderFilesResponse = FileData[];

export interface GetFolderFilesParams {
	folderId?: number;
	storageId: number;
}

/* UploadFile */
export interface UploadFileResponse extends FileData {}

export interface UploadFileBody {
	storageId: number;
	folderId?: number;
	file: File;
}

/* UpdateFile */
export type UpdateFileResponse = boolean;

export interface UpdateFileBody {
	id: number;
	newOriginalName?: string;
	newFolderId?: number;
	isFavourite?: boolean;
}

/* SoftDeleteFile */
export type SoftDeleteFileResponse = boolean;

export interface SoftDeleteFileBody {
	ids: number[];
}

/* deleteFile */
export type DeleteFileResponse = boolean;

export interface DeleteFileParams {
	ids: number[];
}