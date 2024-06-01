import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { signUp, signIn, logout, listenToAuthChanges } from "./authOperations";
import { FirebaseError } from "firebase/app";

interface AuthState {
  user: User | null;
  loading: boolean;
  errors: {
    registerError: FirebaseError | null;
    loginError: FirebaseError | null;
    authError: FirebaseError | null;
  };
}
const initialState: AuthState = {
  user: null,
  loading: false,
  errors: { registerError: null, loginError: null, authError: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.errors.registerError = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.errors.registerError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.errors.loginError = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.errors.loginError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(listenToAuthChanges.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(listenToAuthChanges.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
