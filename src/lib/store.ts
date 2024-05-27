import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./features/invoices/invoicesSlice";
import authReducer from "./features/auth/authSlice";

export const initializeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      invoices: invoicesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of initializeStore
export type AppStore = ReturnType<typeof initializeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
