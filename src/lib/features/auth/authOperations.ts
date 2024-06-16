import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/src/firebase.config";
import { RootState } from "../../store";
import { savePendingCredential, setUser } from "./authSlice";

interface AuthData {
  email: string;
  password: string;
  displayName?: string;
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName }: AuthData, { rejectWithValue }) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await result.user.getIdToken();
      setCookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      if (result.user) {
        await updateProfile(result.user as User, {
          displayName: displayName,
        });
      }
      return { ...result.user, displayName: displayName };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: AuthData, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const token = await result.user.getIdToken();
      setCookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      return result.user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const loginWithProvider = createAsyncThunk(
  "auth/loginWithProvider",
  async (
    { provider }: { provider: "google" | "facebook" },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const result = await signInWithPopup(
        auth,
        provider === "google"
          ? new GoogleAuthProvider()
          : new FacebookAuthProvider()
      );

      const token = await result.user.getIdToken();
      setCookie("__token__", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      const state = getState() as RootState;
      if (state.auth.pendingCred) {
        const pendingCred = state.auth.pendingCred!;

        if (pendingCred !== null) {
          await linkWithCredential(result.user, pendingCred);
          await result.user.reload();
          dispatch(savePendingCredential(null));
        }
      }
      return result.user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (
        firebaseError.code === "auth/account-exists-with-different-credential"
      ) {
        const pendingCred =
          provider === "google"
            ? GoogleAuthProvider.credentialFromError(firebaseError)
            : FacebookAuthProvider.credentialFromError(firebaseError);
        dispatch(savePendingCredential(pendingCred));
      }
      return rejectWithValue(firebaseError);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      deleteCookie("__token__");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const listenToAuthChanges = createAsyncThunk(
  "auth/listenToAuthChanges",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await user.getIdToken();
            setCookie("__token__", token, {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
            dispatch(setUser(user));
            resolve(user);
          } else {
            deleteCookie("__token__");
            dispatch(logout());
            resolve(null);
          }
        });
        return () => unsubscribe();
      });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    { displayName, photoURL }: { displayName?: string; photoURL?: string },
    { rejectWithValue }
  ) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    user.reload();

    try {
      if (displayName || photoURL) {
        await updateProfile(user, { displayName, photoURL });
      }

      return {
        ...auth.currentUser,
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL,
      };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    user.reload();
    try {
      await updateEmail(user, email);

      return {
        ...user,
        email: email || user.email,
      };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const sendlVerificationEmail = createAsyncThunk(
  "auth/sendlVerificationEmail",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await sendEmailVerification(user);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async ({ newPassword }: { newPassword: string }, { rejectWithValue }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    try {
      await updatePassword(user, newPassword);

      return user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);
