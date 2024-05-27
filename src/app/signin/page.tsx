"use client";
import React, { useState } from "react";
import { signIn } from "@/src/lib/features/auth/authOperations";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/hooks";
import InputField from "@/src/components/InputField";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(signIn({ email, password }));

    router.push("/invoices");
  };

  return (
    <main>
      <div className="container flex justify-center">
        <div className="form-wrapper">
          <h1 className="mt-60 mb-30">Sign In</h1>
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

            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </main>
  );
}
