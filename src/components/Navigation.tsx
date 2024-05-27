"use client";
import Link from "next/link";
import { useAppSelector } from "../lib/hooks";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const user = useAppSelector((state) => state.auth.user);

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

        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
