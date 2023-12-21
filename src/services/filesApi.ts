import { emptySplitApi } from "./emptySplitApi";
import { FileDataWithSharedWith, FileType, SortValue } from "./types";

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
			providesTags: ["Files", "SharedFiles", "FavouriteFiles"],
		}),

		uploadFile: build.mutation<UploadFileResponse, UploadFileBody>({
			query: ({ token, ...body }) => {
				if (!body.file || body.file.size > 5242880)
					throw new Error("error"); /* 5MB */

				const formData = new FormData();
				formData.append("file", body.file);
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
			invalidatesTags: ["Files", "FavouriteFiles", "SharedFiles"],
		}),

		updateFile: build.mutation<UpdateFileResponse, UpdateFileBody>({
			query: ({ token, ...body }) => ({
				url: "/files",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files", "FavouriteFiles", "SharedFiles"],
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
			invalidatesTags: ["Files", "FavouriteFiles", "SharedFiles"],
		}),

		/* Favourite */
		getFavouriteFiles: build.query<
			FileDataWithSharedWith[],
			{ token: string | undefined }
		>({
			query: ({ token }) => ({
				url: "/files/favourite",
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["FavouriteFiles"],
		}),

		addToFavourite: build.mutation<
			FileDataWithSharedWith,
			{ fileId: number; token: string | undefined }
		>({
			query: ({ fileId, token }) => ({
				url: "/files/favourite/add",
				method: "PUT",
				body: {
					fileId,
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["FavouriteFiles", "Files" /*  "SharedFiles" */],
		}),

		removeFromFavourite: build.mutation<
			FileDataWithSharedWith,
			{ fileId: number; token: string | undefined }
		>({
			query: ({ fileId, token }) => ({
				url: "/files/favourite/remove",
				method: "PUT",
				body: {
					fileId,
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["FavouriteFiles", "Files" /* "SharedFiles" */],
		}),

		/* Share */
		getSharedFiles: build.query<
			FileDataWithSharedWith[],
			{ token: string | undefined }
		>({
			query: ({ token }) => ({
				url: "/files/share",
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["SharedFiles"],
		}),

		share: build.mutation<
			FileDataWithSharedWith,
			{ fileId: number; shareWith: number[]; token: string | undefined }
		>({
			query: ({ fileId, shareWith, token }) => ({
				url: "/files/share/add",
				method: "PUT",
				body: {
					fileId,
					shareWith,
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: [/* "FavouriteFiles", */ "Files", "SharedFiles"],
		}),

		removeFromShared: build.mutation<
			FileDataWithSharedWith,
			{
				fileId: number;
				userIdsToRemove: number[];
				token: string | undefined;
			}
		>({
			query: ({ fileId, userIdsToRemove, token }) => ({
				url: "/files/share/remove",
				method: "PUT",
				body: {
					fileId,
					userIdsToRemove,
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: [/* "FavouriteFiles",  */ "Files", "SharedFiles"],
		}),
	}),
	overrideExisting: false,
});

/* GetAllFiles */

export interface GetAllFilesResponse {
	files: FileDataWithSharedWith[];
	count: number;
	isLastPage: boolean;
	page: number;
}

export interface GetAllFilesParams {
	filesType?: FileType;
	page?: number;
	limit?: number;
	sort?: SortValue;
	search?: string;
	createdAy?: string;
	token: string | undefined;
}

/* UploadFile */

export interface UploadFileResponse extends FileDataWithSharedWith {}

export interface UploadFileBody {
	folderId: number;
	file: File;
	token: string | undefined;
}

/* UpdateFile */

export type UpdateFileResponse = boolean;

export interface UpdateFileBody {
	id: number;
	newOriginalName?: string;
	token: string | undefined;
	newFolderId?: number;
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