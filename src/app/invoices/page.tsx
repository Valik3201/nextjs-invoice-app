"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/src/lib/features/auth/authOperations";
import AddInvoiceForm from "@/src/components/AddInvoiceForm";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchInvoices } from "@/src/lib/features/invoices/invoicesOperations";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const invoices = useAppSelector((state) => state.invoices.invoices);
  const error = useAppSelector((state) => state.invoices.error);

  useEffect(() => {
    if (user) {
      dispatch(fetchInvoices(user.uid));
    }
  }, [user, dispatch]);

  const result = {
    invoices,
    error,
  };

  console.log(result);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user, router]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div>
      {user && !loading && (
        <>
          <h1 className="text-3xl">
            Welcome back, <span className="font-bold">{user.displayName}</span>
          </h1>
          <button onClick={handleLogout} className="text-red-medium font-bold">
            Logout
          </button>

          <AddInvoiceForm />
        </>
      )}
    </div>
  );
}
