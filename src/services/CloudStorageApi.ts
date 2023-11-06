import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from "@reduxjs/toolkit/query/react";
import { FileType, SortValue, FileDataWithSharedWith } from "../types/fileData";
import { UserDataWithSharedFiles } from "../types/user";

export const cloudStorageApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: ["Files", "FavouriteFiles", "SharedFiles", "Users"],
	endpoints: (builder) => ({
		getAllFiles: builder.query<
			{
				files: FileDataWithSharedWith[];
				count: number;
				isLastPage: boolean;
				page: number;
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
			query: ({ token, ...params }) => ({
				url: "/files",
				method: "GET",
				params,
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Files", "SharedFiles", "FavouriteFiles"],
		}),

		uploadFile: builder.mutation<
			FileDataWithSharedWith,
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
			{ ids: number[]; token: string | undefined }
		>({
			query: ({ ids, token }) => ({
				url: "/files",
				method: "DELETE",
				params: {
					ids: ids.join(", "),
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
			FileDataWithSharedWith[],
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
			FileDataWithSharedWith,
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
			invalidatesTags: ["FavouriteFiles", "Files" /*  "SharedFiles" */],
		}),

		removeFromFavourite: builder.mutation<
			FileDataWithSharedWith,
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
			invalidatesTags: ["FavouriteFiles", "Files" /* "SharedFiles" */],
		}),

		/* Share */
		getSharedFiles: builder.query<
			FileDataWithSharedWith[],
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
			FileDataWithSharedWith,
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
			invalidatesTags: [/* "FavouriteFiles", */ "Files", "SharedFiles"],
		}),

		removeFromShared: builder.mutation<
			FileDataWithSharedWith,
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
			invalidatesTags: [/* "FavouriteFiles",  */ "Files", "SharedFiles"],
		}),

		/* USERS */
		getAllUsers: builder.query<
			{
				page: number;
				count: number;
				isLastPage: boolean;
				users: UserDataWithSharedFiles[];
			},
			{
				orderBy?: "SharedWith" | "Creation";
				orderValue?: "ASC" | "DESC";
				page?: number;
				limit?: number;
				searchByEmail?: string;
				token: string | undefined;
			}
		>({
			query: ({ token, ...params }) => ({
				url: "/users",
				params,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["Users"],
		}),
	}),
});
