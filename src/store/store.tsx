import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// Reducers
import AuthReducer from "./authSlice/authSlice";

import { cloudStorageApi } from "../services/CloudStorageApi";

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		[cloudStorageApi.reducerPath]: cloudStorageApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cloudStorageApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
