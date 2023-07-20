import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    isAuth: boolean;
}

const initialState: IInitialState = {
    isAuth: false,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

const AuthReducer = AuthSlice.reducer;
const AuthActions = AuthSlice.actions;

export default AuthReducer;
export { AuthActions };
