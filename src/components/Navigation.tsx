"use client";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";

export default function Navigation() {
  const { user } = useAuthContext();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {user && (
          <li>
            <Link href="/invoices">Invoices</Link>
          </li>
        )}

        {!user && (
          <>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
