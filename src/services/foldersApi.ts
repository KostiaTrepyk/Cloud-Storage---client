import { emptySplitApi } from "./emptySplitApi";
import { Folder, FileDataWithSharedWith } from "./types";

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
	folderId: number;
	token: string | undefined;
}

export interface getFolderResponse {
	currentFolder: Folder | null;
	folders: Folder[];
	files: FileDataWithSharedWith[];
}

/* Create */

export interface createFolderBody {
	folderName: string;
	parrentFolderId?: number;
	token: string | undefined;
}

export type createFolderResponse = Folder;

/* Upload */

export interface updateFolderBody {
	folderId: number;
	newFolderName?: string;
	newParrentFolderId?: number;
	token: string | undefined;
}

export type updateFolderResponse = boolean;

/* Delete */
export interface deleteFolderBody {
	foldersIds: number[];
	token: string | undefined;
}

export type deleteFolderResponse = boolean;