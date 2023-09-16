import { createSlice } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { signIn } from "./reducers/signIn";
import { UserStatistic } from "../../types/user";
import { getMe } from "./reducers/getMe";
import { signUp } from "./reducers/signUp";
import { deleteCookieByName } from "../../helpers/cookie";
import { cookieKeys } from "../../types/cookie";

interface InitialState {
	userData: UserStatistic | null;
	isAuth: boolean;
	status: keyof typeof QueryStatus;
}

const initialState: InitialState = {
	userData: null,
	isAuth: false,
	status: "uninitialized",
};

const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.status = "uninitialized";
			state.isAuth = false;
			state.userData = null;
			deleteCookieByName(cookieKeys.TOKEN, { path: "/" });
		},
	},
	extraReducers(builder) {
		// signUp
		builder.addCase(signUp.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(signUp.fulfilled, (state) => {});
		builder.addCase(signUp.rejected, (state) => {
			state.status = "rejected";
		});

		// signIn
		builder.addCase(signIn.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(signIn.fulfilled, (state, action) => {});
		builder.addCase(signIn.rejected, (state) => {
			state.status = "rejected";
		});

		// getMe
		builder.addCase(getMe.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(getMe.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.isAuth = true;
			state.userData = action.payload;
		});
		builder.addCase(getMe.rejected, (state) => {
			state.status = "rejected";
			state.isAuth = false;
			state.userData = null;
			deleteCookieByName(cookieKeys.TOKEN, { path: "/" });
		});
	},
});

const AuthReducer = AuthSlice.reducer;
const AuthActions = AuthSlice.actions;

export default AuthReducer;
export { AuthActions };
