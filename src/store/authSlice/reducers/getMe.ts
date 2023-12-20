import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserStatistic } from "services/types";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

export const getMe = createAsyncThunk(
	"getMe",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<UserStatistic>("/users/me", {
				headers: {
					Authorization: `Bearer ${getCookieValue(cookieKeys.TOKEN)}`,
				},
			});
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error: unknown) {
			return thunkAPI.rejectWithValue({});
		}
	},
	{
		condition(_, { getState, extra }) {
			const token = getCookieValue(cookieKeys.TOKEN);
			if (!token) return false;
		},
	}
);
