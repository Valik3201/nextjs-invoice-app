"use client";

import { useEffect, useRef } from "react";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import { useAppSelector, useAppStore } from "@/src/lib/hooks";
import { useAuth } from "@/src/hooks/useAuth";
import AuthNavigation from "@/src/components/Auth/AuthNavigation";
import AuthError from "@/src/components/Auth/AuthError";
import SignUpForm from "@/src/components/Auth/SignUpForm";

export default function SignUp() {
  const error = useAppSelector((state) => state.auth.errors.registerError);
  const store = useAppStore();
  const initialize = useRef(false);

  useEffect(() => {
    if (!initialize.current) {
      store.dispatch(resetErrors());
      initialize.current = true;
    }
  }, [store]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <h1 className="text-heading-m md:text-heading-l mb-8">
          Create an account
        </h1>

        <SignUpForm />

        <AuthNavigation />

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
