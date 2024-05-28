"use client";
import Link from "next/link";
import { useAppSelector } from "../lib/hooks";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import Avatar from "../icons/Avatar";

export default function Navigation() {
  const user = useAppSelector((state) => state.auth.user);

  console.log(user);

  return (
    <nav className="bg-[#373b53] text-white md:w-[103px] h-screen fixed top-0 rounded-r-[1.25rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Logo />
            <span className="sr-only">Home</span>
          </Link>

          <ul className="flex flex-col gap-2 w-full items-center">
            <li className="hover:text-primary transition duration-200 ease-in-out text-lg">
              <Link href="/">Home</Link>
            </li>

            {user && (
              <li className="hover:text-primary transition duration-200 ease-in-out text-lg">
                <Link href="/invoices">Invoices</Link>
              </li>
            )}

            {!user && (
              <>
                <li className="hover:text-primary transition duration-200 ease-in-out text-lg">
                  <Link href="/signup">Sign Up</Link>
                </li>
                <li className="hover:text-primary transition duration-200 ease-in-out text-lg">
                  <Link href="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="divide-y-2 divide-[#494e6e]">
          <div className="flex justify-center w-full py-7">
            <div className="w-5 h-5 flex justify-center items-center">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex justify-center w-full py-[26px]">
            {user?.photoURL ? (
              <img
                className="w-10 h-10 rounded-full"
                src={user.photoURL}
                alt="User avatar"
              />
            ) : (
              <Avatar />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
