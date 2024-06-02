"use client";

import { useEffect } from "react";
import { listenToAuthChanges } from "../lib/features/auth/authOperations";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import Spinner from "../components/Loader/Spinner";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { refreshing } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (refreshing) {
    return <Spinner />;
  }

  return <>{children}</>;
}
