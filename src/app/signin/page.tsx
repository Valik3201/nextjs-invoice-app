"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector, useAppStore } from "@/src/lib/hooks";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import { signIn } from "@/src/lib/features/auth/authOperations";
import AuthError from "@/src/components/AuthError";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.errors.loginError);
  const store = useAppStore();
  const initialize = useRef(false);

  useEffect(() => {
    if (!initialize.current) {
      store.dispatch(resetErrors());
      initialize.current = true;
    }
  }, [store]);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(signIn({ email, password })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <h1 className="text-heading-m md:text-heading-l mb-8">Sign In</h1>

        <form onSubmit={handleForm} className="form">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Button variant="primary" type="submit" size="full">
            Sign In
          </Button>
        </form>

        <p className="text-body-variant text-gray-medium dark:text-gray-light mt-6">
          Don’t have an account yet?{" "}
          <Link href={"/signup"} className="text-primary hover:underline">
            Sign up here
          </Link>
        </p>

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
