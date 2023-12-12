import { UserData } from "types/user";
import { emptySplitApi } from "./emptySplitApi";
import { FileType, SortValue } from "types/fileData";

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

export interface FileData {
	id: number;
	filename: string;
	originalname: string;
	size: number;
	mimetype: string;
	isFavourite: boolean;
	deletedAt: Date | null;
	createdAt: Date;
	owner: UserData;
}

export interface FileDataWithSharedWith extends FileData {
	sharedWith: UserData[];
}

/* GetAllFiles */

interface GetAllFilesResponse {
	files: FileDataWithSharedWith[];
	count: number;
	isLastPage: boolean;
	page: number;
}

interface GetAllFilesParams {
	filesType?: FileType;
	page?: number;
	limit?: number;
	sort?: SortValue;
	search?: string;
	createdAy?: string;
	token: string | undefined;
}

/* UploadFile */

interface UploadFileResponse extends FileDataWithSharedWith {}

interface UploadFileBody {
	folderId: number;
	file: File;
	token: string | undefined;
}

/* SoftDeleteFile */

type SoftDeleteFileResponse = boolean;

interface SoftDeleteFileBody {
	ids: number[];
	token: string | undefined;
}

/* deleteFile */

type DeleteFileResponse = boolean;

interface DeleteFileParams {
	ids: number[];
	token: string | undefined;
}