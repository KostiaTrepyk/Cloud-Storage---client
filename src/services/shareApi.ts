import { emptySplitApi } from "./emptySplitApi";

export const shareApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		shareFiles: build.mutation<ShareFilesResponse, ShareFilesBody>({
			query: ({ token, ...body }) => ({
				url: "/share/shareFiles",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 120, // 2min
			}),
			invalidatesTags: ["Files"],
		}),

		unshareFiles: build.mutation<UnshareFilesResponse, UnshareFilesBody>({
			query: ({ token, ...body }) => ({
				url: "/share/unshareFiles",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Files"],
		}),

		shareFolders: build.mutation<ShareFoldersResponse, ShareFoldersBody>({
			query: ({ token, ...body }) => ({
				url: "/share/shareFolders",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Folders"],
		}),

		unshareFolders: build.mutation<
			UnshareFoldersResponse,
			UnshareFoldersBody
		>({
			query: ({ token, ...body }) => ({
				url: "/share/unshareFolders",
				method: "PUT",
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

/* ShareFiles */

export interface ShareFilesBody {
	fileIds: number[];
	userIdsToShareWith: number[];
	token: string | undefined;
}

export type ShareFilesResponse = {
	sharedWith: number[];
};

/* UnshareFiles */

export interface UnshareFilesBody {
	fileIds: number[];
	userIdsToRemove: number[];
	token: string | undefined;
}

export type UnshareFilesResponse = boolean;

/* Upload */

export interface ShareFoldersBody {
	folderIds: number[];
	userIdsToShareWith: number[];
	token: string | undefined;
}

export interface ShareFoldersResponse {
	sharedWith: number[];
}

/* Delete */

export interface UnshareFoldersBody {
	folderIds: number[];
	userIdsToRemove: number[];
	token: string | undefined;
}

export type UnshareFoldersResponse = boolean;