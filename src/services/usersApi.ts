import { emptySplitApi } from "./emptySplitApi";
import { UserDataWithSharedFiles } from "types/user";

export const usersApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		/* USERS */
		getAllUsers: build.query<GetAllUsersRepsonse, GetAllUsersParams>({
			query: ({ token, ...params }) => ({
				url: "/users/allUsers",
				params,
				headers: {
					Authorization: "Bearer " + token,
				},
				timeout: 1000 * 30, // 30sec
			}),
			providesTags: ["Users"],
		}),
	}),
});

/* getAllUsers */

interface GetAllUsersRepsonse {
	page: number;
	count: number;
	isLastPage: boolean;
	users: UserDataWithSharedFiles[];
}

interface GetAllUsersParams {
	orderBy?: "SharedWith" | "Creation";
	orderValue?: "ASC" | "DESC";
	page?: number;
	limit?: number;
	searchByEmail?: string;
	token: string | undefined;
}