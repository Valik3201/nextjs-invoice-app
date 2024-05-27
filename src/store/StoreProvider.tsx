"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { initializeStore, AppStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
