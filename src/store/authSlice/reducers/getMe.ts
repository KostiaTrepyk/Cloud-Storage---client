import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookieValue } from "../../../helpers/cookie";
import { User } from "../../../types/user";

export const getMe = createAsyncThunk(
	"getMe",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<User>("/users/me", {
				headers: {
					Authorization: `Bearer ${getCookieValue("token")}`,
				},
			});
			return thunkAPI.fulfillWithValue(response.data);
		} catch (error: unknown) {
			return thunkAPI.rejectWithValue({});
		}
	},
	{
		condition(_, { getState, extra }) {
			const token = getCookieValue("token");
			if (!token) return false;
		},
	}
);
