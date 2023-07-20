import { configureStore } from "@reduxjs/toolkit";

// Reducers
import AuthReducer from "./authSlice/authSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
