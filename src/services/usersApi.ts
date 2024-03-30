import { emptySplitApi } from "./emptySplitApi";
import { UserDataWithSharedFiles } from "./types";

export const usersApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		/* USERS */
		getAllUsers: build.query<GetAllUsersRepsonse, GetAllUsersParams>({
			query: (params) => ({
				url: "/users/allUsers",
				params,
				timeout: 1000 * 30, // 30sec
			}),
			providesTags: ["Users"],
		}),
	}),
});

/* getAllUsers */

export interface GetAllUsersRepsonse {
	page: number;
	count: number;
	isLastPage: boolean;
	users: UserDataWithSharedFiles[];
}

export interface GetAllUsersParams {
	orderBy?: "SharedWith" | "Creation";
	orderValue?: "ASC" | "DESC";
	page?: number;
	limit?: number;
	searchByEmail?: string;
}