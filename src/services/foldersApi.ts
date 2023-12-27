import { emptySplitApi } from "./emptySplitApi";
import { FolderData, FileDataWithSharedWith } from "./types";

export const foldersApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getFolder: build.query<getFolderResponse, getFolderBody>({
			query: ({ token, ...params }) => ({
				url: "/folders/one",
				method: "GET",
				params,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 120, // 2min
			}),
			providesTags: ["Folders", "Files"],
		}),

		createFolder: build.mutation<createFolderResponse, createFolderBody>({
			query: ({ token, ...body }) => ({
				url: "/folders",
				method: "POST",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),

		updateFolder: build.mutation<updateFolderResponse, updateFolderBody>({
			query: ({ token, ...body }) => ({
				url: "/folders",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),

		deleteFolder: build.mutation<deleteFolderResponse, deleteFolderBody>({
			query: ({ token, ...body }) => ({
				url: "/folders",
				method: "DELETE",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),
	}),
});

/* Get */

export interface getFolderBody {
	storageId: number;
	folderId?: number;
	token: string | undefined;
}

export interface getFolderResponse {
	currentFolder: FolderData | null;
	folders: FolderData[];
	files: FileDataWithSharedWith[];
}

/* Create */

export interface createFolderBody {
	folderName: string;
	parentFolderId?: number;
	storageId: number;
	token: string | undefined;
}

export type createFolderResponse = FolderData;

/* Upload */

export interface updateFolderBody {
	folderId: number;
	newFolderName?: string;
	newParentFolderId?: number;
	token: string | undefined;
}

export type updateFolderResponse = boolean;

/* Delete */
export interface deleteFolderBody {
	foldersIds: number[];
	token: string | undefined;
}

export type deleteFolderResponse = boolean;