"use client";
import React, { useState } from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password, name);

    if (error) {
      console.log(error);
      return;
    }

    console.log(result);
    router.push("/invoices");
  };

  return (
    <main>
      <div className="container flex justify-center">
        <div className="form-wrapper">
          <h1 className="mt-60 mb-30">Sign up</h1>
          <form onSubmit={handleForm} className="form">
            <label htmlFor="name">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
              />
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </label>
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </main>
  );
}
