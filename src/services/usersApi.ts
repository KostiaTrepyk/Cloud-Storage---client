import { emptySplitApi } from "./emptySplitApi";
import { UserDataWithSharedFiles } from "types/user";

export const usersApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    /* USERS */
    getAllUsers: build.query<
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
        timeout: 1000 * 30, // 30sec
      }),
      providesTags: ["Users"],
    }),
  }),
});
