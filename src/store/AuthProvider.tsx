"use client";
import { useEffect } from "react";
import { listenToAuthChanges } from "../lib/features/auth/authOperations";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
