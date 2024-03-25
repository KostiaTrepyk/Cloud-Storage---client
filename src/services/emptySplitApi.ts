import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
	reducerPath: "cloudStorageApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: [
		"Storages",
		"Files",
		"Users",
		"Folders",
	],
	endpoints: () => ({}),
});
