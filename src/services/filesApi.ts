import { emptySplitApi } from "./emptySplitApi";
import { FileDataWithSharedWith, FileType, SortValue } from "types/fileData";

export const filesApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFiles: build.query<
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

    uploadFile: build.mutation<
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

    deleteFile: build.mutation<
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
    getFavouriteFiles: build.query<
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

    addToFavourite: build.mutation<
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

    removeFromFavourite: build.mutation<
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
    getSharedFiles: build.query<
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

    share: build.mutation<
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

    removeFromShared: build.mutation<
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
  }),
  overrideExisting: false,
});
