import { createSlice } from "@reduxjs/toolkit";
import { User, AuthCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  listenToAuthChanges,
  loginWithProvider,
  logout,
  resetUserPassword,
  sendlVerificationEmail,
  signUp,
  signIn,
  updateUserEmail,
  updateUserProfile,
  updateUserPassword,
} from "./authOperations";

interface AuthState {
  user: User | null;
  loading: boolean;
  refreshing: boolean;
  errors: {
    registerError: FirebaseError | null;
    loginError: FirebaseError | null;
    authError: FirebaseError | null;
  };
  pendingCred: AuthCredential | null;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  refreshing: false,
  errors: { registerError: null, loginError: null, authError: null },
  pendingCred: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload as User;
      state.loading = false;
    },
    resetErrors: (state) => {
      state.errors = {
        registerError: null,
        loginError: null,
        authError: null,
      };
    },
    savePendingCredential: (state, action) => {
      state.pendingCred = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.errors.registerError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload as User;
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
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.errors.loginError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(loginWithProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(loginWithProvider.rejected, (state, action) => {
        state.loading = false;
        state.errors.loginError = action.payload as FirebaseError;
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
        state.refreshing = true;
        state.errors.authError = null;
      })
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.refreshing = false;
        state.user = action.payload as User;
      })
      .addCase(listenToAuthChanges.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.refreshing = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(updateUserEmail.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(sendlVerificationEmail.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(sendlVerificationEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendlVerificationEmail.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.errors.authError = null;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.errors.authError = action.payload as FirebaseError;
        state.loading = false;
      });
  },
});

export const { setUser, resetErrors, savePendingCredential } =
  authSlice.actions;
export default authSlice.reducer;
