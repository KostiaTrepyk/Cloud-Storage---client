import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from "@reduxjs/toolkit/query/react";
import { File } from "../types/file";

export const cloudStorageApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: ["Files"],
	endpoints: (builder) => ({
		getAllFiles: builder.query<
			File[],
			{ type: "trash" | "photos"; token: string | undefined }
		>({
			query: ({ type, token }) => ({
				url: "/files",
				params: {
					type,
				},
				headers: { Authorization: "Bearer " + token },
				timeout: 1000 * 5, // 5sec,
			}),
			providesTags: ["Files"],
		}),
	}),
});
