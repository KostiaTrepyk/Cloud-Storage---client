import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

export const emptySplitApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
		prepareHeaders(headers, api) {
			const token = getCookieValue(cookieKeys.TOKEN);
			if (token) headers.set("Authorization", "Bearer " + token);
			return headers;
		},
	}),
	tagTypes: ["Storages", "Files", "Users", "Folders", "AuthToken"],
	endpoints: () => ({}),
});
