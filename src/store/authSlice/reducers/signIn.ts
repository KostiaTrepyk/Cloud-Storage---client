import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "../../../helpers/cookie";
import { getMe } from "./getMe";
import { RootState } from "../../store";
import { cookieKeys } from "../../../types/cookie";

export interface SignInArg {
	email: string;
	password: string;
}

export const signIn = createAsyncThunk(
	"signIn",
	async (body: SignInArg, thunkAPI) => {
		try {
			const response = await axios.post<{ token: string }>(
				"/auth/login",
				body
			);

			setCookie(cookieKeys.TOKEN, response.data.token, {
				//secure: true,
				path: "/",
			});
			await thunkAPI.dispatch(getMe());

			return thunkAPI.fulfillWithValue(response.data);
		} catch (error: unknown) {
			return thunkAPI.rejectWithValue({});
		}
	},
	{
		condition(_, { getState, extra }) {
			const store = getState() as RootState;
			const status = store.auth.status;
			if (status === "pending") return false;
		},
	}
);