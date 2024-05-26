"use client";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import logout from "../../firebase/auth/logout";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      {user && (
        <>
          <h1>Welcome back, {user.displayName}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
