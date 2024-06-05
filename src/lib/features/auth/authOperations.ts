import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/src/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { setUser } from "./authSlice";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      password,
      displayName,
    }: { email: string; password: string; displayName: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      return result.user;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return rejectWithValue(firebaseError);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          dispatch(setUser(user));
          resolve(user);
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
      console.log(error);
      return rejectWithValue(firebaseError);
    }
  }
);
