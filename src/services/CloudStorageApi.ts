import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from "@reduxjs/toolkit/query/react";
import { FileType, SortValue, FileData } from "../types/fileData";

export const cloudStorageApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: ["Files", "FavouriteFiles", "SharedFiles"],
	endpoints: (builder) => ({
		getAllFiles: builder.query<
			{
				files: FileData[];
				count: number;
				isLastPage: boolean;
			},
			{
				filesType?: FileType;
				page?: number;
				limit?: number;
				sort?: SortValue;
				search?: string;
				createdAy?: string;
				token: string | undefined;
			}
		>({
			query: ({
				filesType,
				page,
				limit,
				sort,
				search,
				createdAy,
				token,
			}) => ({
				url: "/files",
				method: "GET",
				params: {
					filesType,
					page,
					limit,
					sort,
					search,
					createdAy,
				},
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files"],
		}),

		uploadFile: builder.mutation<
			File,
			{ file: FormData; token: string | undefined }
		>({
			query: ({ file, token }) => ({
				url: "/files",
				method: "POST",
				body: file,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 60, // 1min,
			}),
			invalidatesTags: ["Files"],
		}),

		deleteFile: builder.mutation<
			boolean,
			{ ids: string; token: string | undefined }
		>({
			query: ({ ids, token }) => ({
				url: "/files",
				method: "DELETE",
				params: {
					ids,
				},
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			invalidatesTags: ["Files", "FavouriteFiles", "SharedFiles"],
		}),

		/* Favourite */
		getFavouriteFiles: builder.query<
			FileData[],
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

		addToFavourite: builder.mutation<
			FileData,
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
			invalidatesTags: ["FavouriteFiles", "Files", "SharedFiles"],
		}),

		removeFromFavourite: builder.mutation<
			FileData,
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
			invalidatesTags: ["FavouriteFiles", "Files", "SharedFiles"],
		}),

		/* Share */
		getSharedFiles: builder.query<
			FileData[],
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

		share: builder.mutation<
			FileData,
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
			invalidatesTags: ["FavouriteFiles", "Files", "SharedFiles"],
		}),

		removeFromShared: builder.mutation<
			FileData,
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
			invalidatesTags: ["FavouriteFiles", "Files", "SharedFiles"],
		}),
	}),
});
