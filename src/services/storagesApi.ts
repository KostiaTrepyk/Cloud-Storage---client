import { emptySplitApi } from "./emptySplitApi";
import { StorageData } from "./types";

export const storagesApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getFolder: build.query<getStoragesAllResponse, getStoragesAllBody>({
			query: ({ token, ...params }) => ({
				url: "/storages/all",
				method: "GET",
				params,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 120, // 2min
			}),
			providesTags: ["Storages"],
		}),

		createFolder: build.mutation<createStorageResponse, createStorageBody>({
			query: ({ token, ...body }) => ({
				url: "/storages/create",
				method: "POST",
				body: { ...body, storageId: 1 },
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Storages"],
		}),

		updateFolder: build.mutation<updateFolderResponse, updateStorageBody>({
			query: ({ token, ...body }) => ({
				url: "/storages/update",
				method: "PUT",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Storages"],
		}),

		deleteFolder: build.mutation<deleteStorageResponse, deleteStorageBody>({
			query: ({ token, ...body }) => ({
				url: "/storages/delete",
				method: "DELETE",
				body,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Storages"],
		}),
	}),
});

/* Get */

export interface getStoragesAllBody {
	token: string | undefined;
}

export type getStoragesAllResponse = StorageData[];

/* Create */

export interface createStorageBody {
	name: string;
	token: string | undefined;
}

export type createStorageResponse = StorageData;

/* Upload */

export interface updateStorageBody {
	newName: string;
	token: string | undefined;
}

export type updateFolderResponse = boolean;

/* Delete */

export interface deleteStorageBody {
	storageId: number;
	token: string | undefined;
}

export type deleteStorageResponse = boolean;