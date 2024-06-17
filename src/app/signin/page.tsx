"use client";

import { useEffect, useRef } from "react";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import { useAppSelector, useAppStore } from "@/src/lib/hooks";
import AuthNavigation from "@/src/components/Auth/AuthNavigation";
import AuthError from "@/src/components/Auth/AuthError";
import SignInOAuthButtons from "@/src/components/Auth/SignInOAuthButtons";
import SignInForm from "@/src/components/Auth/SignInForm";

export default function SignIn() {
  const error = useAppSelector((state) => state.auth.errors.loginError);
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
        <h1 className="text-heading-m md:text-heading-l mb-8">Welcome back</h1>

        <SignInOAuthButtons />

        <SignInForm />

        <AuthNavigation isSignup />

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
