"use client";
import React, { useState } from "react";
import { signUp } from "@/src/lib/features/auth/authOperations";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/hooks";
import InputField from "@/src/components/InputField";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(signUp({ email, password, displayName: name }));

    router.push("/invoices");
  };

  return (
    <main>
      <div className="container flex justify-center">
        <div>
          <h1 className="mt-60 mb-30">Sign up</h1>
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
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </main>
  );
}
