import { emptySplitApi } from "./emptySplitApi";
import { StorageData, StorageDataWithRemainingSpace } from "./types";

export const storagesApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		getStorages: build.query<getStoragesAllResponse, getStoragesAllBody>({
			query: (params) => ({
				url: "/storages/all",
				method: "GET",
				params,
				timeout: 1000 * 120, // 2min
			}),
			providesTags: ["Storages"],
		}),

		createStorage: build.mutation<createStorageResponse, createStorageBody>(
			{
				query: (body) => ({
					url: "/storages/create",
					method: "POST",
					body: { ...body, storageId: 1 },
					timeout: 1000 * 60, // 1min
				}),
				invalidatesTags: ["Storages"],
			}
		),

		updateStorage: build.mutation<updateFolderResponse, updateStorageBody>({
			query: (body) => ({
				url: "/storages/update",
				method: "PUT",
				body,
				timeout: 1000 * 60, // 1min
			}),
			invalidatesTags: ["Storages"],
		}),

		deleteStorage: build.mutation<deleteStorageResponse, deleteStorageBody>(
			{
				query: (body) => ({
					url: "/storages/delete",
					method: "DELETE",
					body,
					timeout: 1000 * 60, // 1min
				}),
				invalidatesTags: ["Storages"],
			}
		),
	}),
});

/* Get */

export interface getStoragesAllBody {}

export type getStoragesAllResponse = StorageDataWithRemainingSpace[];

/* Create */

export interface createStorageBody {
	name: string;
}

export type createStorageResponse = StorageData;

/* Upload */

export interface updateStorageBody {
	newName: string;
	storageId: number;
}

export type updateFolderResponse = boolean;

/* Delete */

export interface deleteStorageBody {
	storageId: number;
}

export type deleteStorageResponse = boolean;