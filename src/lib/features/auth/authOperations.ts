import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@/src/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
