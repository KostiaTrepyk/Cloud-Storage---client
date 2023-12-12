import { emptySplitApi } from "./emptySplitApi";
import { FileDataWithSharedWith } from "types/fileData";

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
			providesTags: ["Folders"],
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

interface Folder {
	id: number;
	name: string;
	createdAt: string;
	parrentFolderId: number;
}

/* Get */

interface getFolderBody {
	folderId: number;
	token: string | undefined;
}

interface getFolderResponse {
	currentFolder: Folder | null;
	folders: Folder[];
	files: FileDataWithSharedWith[];
}

/* Create */

interface createFolderBody {
	folderName: string;
	parrentFolderId?: number;
	token: string | undefined;
}

type createFolderResponse = Folder;

/* Upload */

interface updateFolderBody {
	folderId: number;
	newFolderName?: string;
	newParrentFolderId?: number;
	token: string | undefined;
}

type updateFolderResponse = boolean;

/* Delete */
interface deleteFolderBody {
	foldersIds: number[];
	token: string | undefined;
}

type deleteFolderResponse = boolean;