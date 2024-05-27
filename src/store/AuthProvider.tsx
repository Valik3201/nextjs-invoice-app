"use client";
import { useEffect } from "react";
import { listenToAuthChanges } from "../lib/features/auth/authOperations";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
