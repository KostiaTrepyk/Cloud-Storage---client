import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from "@reduxjs/toolkit/query/react";
import { FileData, FileType } from "../types/fileData";

export const cloudStorageApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: ["Files"],
	endpoints: (builder) => ({
		getAllFiles: builder.query<
			FileData[],
			{ type: FileType; token: string | undefined }
		>({
			query: ({ type, token }) => ({
				url: "/files",
				method: "GET",
				params: {
					type,
				},
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 5, // 5sec,
			}),
			providesTags: ["Files"],
		}),
		uploadFile: builder.mutation<
			FileData,
			{ file: FormData; token: string | undefined }
		>({
			query: ({ file, token }) => ({
				url: "/files",
				method: "POST",
				body: file,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 5, // 5sec,
			}),
			invalidatesTags: ["Files"],
		}),
	}),
});
