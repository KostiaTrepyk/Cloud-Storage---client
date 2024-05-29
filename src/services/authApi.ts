import { getCookieValue, setCookie } from "helpers/cookie";
import { emptySplitApi } from "./emptySplitApi";
import { UserStatistic } from "./types";
import { cookieKeys } from "types/cookie";

export const authApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginParams>({
			query: (params) => ({
				url: "/auth/login",
				method: "POST",
				params,
				timeout: 1000 * 30, // 30sec,
			}),
			transformResponse: (baseQueryReturnValue: LoginResponse) => {
				setCookie(cookieKeys.TOKEN, baseQueryReturnValue.token, {
					path: "/",
				});
				return baseQueryReturnValue;
			},
			invalidatesTags: ["AuthToken"],
		}),

		registration: build.mutation<RegistrationResponse, RegistrationParams>({
			query: (params) => ({
				url: "/auth/registration",
				method: "POST",
				params,
				timeout: 1000 * 30, // 30sec,
			}),
			transformResponse: (baseQueryReturnValue: RegistrationResponse) => {
				setCookie(cookieKeys.TOKEN, baseQueryReturnValue.token, {
					path: "/",
				});
				return baseQueryReturnValue;
			},
			invalidatesTags: ["AuthToken"],
		}),

		getMe: build.query<GetMeResponse, GetMeParams>({
			query: (params) => ({
				url: "/users/me",
				method: "GET",
				params,
				timeout: 1000 * 30, // 30sec,
			}),
			providesTags: ["AuthToken"],
		}),
	}),
	overrideExisting: false,
});

/* Login */
export interface LoginResponse {
	token: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

/* Registration */
export interface RegistrationResponse {
	token: string;
}

export interface RegistrationParams {
	fullName: string;
	email: string;
	password: string;
}

/* Registration */
export interface GetMeResponse extends UserStatistic {}

export interface GetMeParams {}