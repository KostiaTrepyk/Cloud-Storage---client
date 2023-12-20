import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "helpers/cookie";
import { getMe } from "./getMe";
import { RootState } from "store/store";
import { cookieKeys } from "types/cookie";

export interface SignUpArg {
	fullName: string;
	email: string;
	password: string;
}

export const signUp = createAsyncThunk(
	"signUp",
	async (body: SignUpArg, thunkAPI) => {
		try {
			const response = await axios.post<{ token: string }>(
				"/auth/registration",
				body
			);

			setCookie(cookieKeys.TOKEN, response.data.token, {
				//secure: true,
				path: "/",
			});
			await thunkAPI.dispatch(getMe());

			return thunkAPI.fulfillWithValue({});
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