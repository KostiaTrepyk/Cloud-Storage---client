import { emptySplitApi } from "./emptySplitApi";

export const shareApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		share: build.mutation<ShareResponse, ShareBody>({
			query: ({ ...body }) => ({
				url: "/share/share",
				method: "PUT",
				body,
				timeout: 1000 * 120, // 2min
			}),
			invalidatesTags: (res) => {
				return ["Files", "Folders"];
			},
		}),

		unshare: build.mutation<UnshareResponse, UnshareBody>({
			query: ({ ...body }) => ({
				url: "/share/unshare",
				method: "PUT",
				body,
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: (res) => {
				return ["Files", "Folders"];
			},
		}),
	}),
});

/* Share */

export interface ShareBody {
	userIdsToShareWith: number[];
	folderIds?: number[];
	fileIds?: number[];
}

export type ShareResponse = {
	sharedFiles: number[];
	sharedFolders: number[];
};

/* Unshare */

export interface UnshareBody {
	userIdsToRemove: number[];
	folderIds?: number[];
	fileIds?: number[];
}

export interface UnshareResponse {
	unsharedFiles: number[];
	unsharedFolders: number[];
}