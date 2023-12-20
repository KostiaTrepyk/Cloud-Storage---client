import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// Reducers
import AuthReducer from "./authSlice/authSlice";

import { emptySplitApi } from "services/emptySplitApi";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		[emptySplitApi.reducerPath]: emptySplitApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(emptySplitApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
