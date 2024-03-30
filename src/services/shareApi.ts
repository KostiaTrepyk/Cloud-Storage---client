import { emptySplitApi } from "./emptySplitApi";

export const shareApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		share: build.mutation<ShareResponse, ShareBody>({
			query: ({ token, ...body }) => ({
				url: "/share/share",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 120, // 2min
			}),
			invalidatesTags: (res) => {
				return ["Files", "Folders"];
			},
		}),

		unshare: build.mutation<UnshareResponse, UnshareBody>({
			query: ({ token, ...body }) => ({
				url: "/share/unshare",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
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
	token: string | undefined;
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
	token: string | undefined;
}

export interface UnshareResponse {
	unsharedFiles: number[];
	unsharedFolders: number[];
}