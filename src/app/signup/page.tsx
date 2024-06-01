"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { signUp } from "@/src/lib/features/auth/authOperations";
import AuthError from "@/src/components/AuthError";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Button";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.errors.registerError);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(signUp({ email, password, displayName: name })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <h1 className="text-heading-m md:text-heading-l mb-8">Sign Up</h1>

        <form onSubmit={handleForm}>
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />

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
            Sign Up
          </Button>
        </form>

        <p className="text-body-variant text-gray-medium dark:text-gray-light mt-6">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
