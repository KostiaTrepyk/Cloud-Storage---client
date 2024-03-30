import { emptySplitApi } from "./emptySplitApi";
import { FileData, FolderData } from "./types";

export const foldersApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getFolder: build.query<getFolderResponse, getFolderBody>({
			query: (params) => ({
				url: "/folders/one",
				method: "GET",
				params,
				timeout: 1000 * 120, // 2min
			}),
			providesTags: ["Folders", "Files"],
		}),

		createFolder: build.mutation<createFolderResponse, createFolderBody>({
			query: (body) => ({
				url: "/folders",
				method: "POST",
				body,
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),

		updateFolder: build.mutation<updateFolderResponse, updateFolderBody>({
			query: (body) => ({
				url: "/folders",
				method: "PUT",
				body,
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),

		deleteFolder: build.mutation<deleteFolderResponse, deleteFolderBody>({
			query: (body) => ({
				url: "/folders",
				method: "DELETE",
				body,
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
}

export interface getFolderResponse {
	currentFolder: FolderData | null;
	folders: FolderData[];
	files: FileData[];
}

/* Create */

export interface createFolderBody {
	folderName: string;
	parentFolderId?: number;
	storageId: number;
}

export type createFolderResponse = FolderData;

/* Upload */

export interface updateFolderBody {
	folderId: number;
	newFolderName?: string;
	newParentFolderId?: number;
}

export type updateFolderResponse = boolean;

/* Delete */
export interface deleteFolderBody {
	foldersIds: number[];
}

export type deleteFolderResponse = boolean;