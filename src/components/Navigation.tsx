"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import Avatar from "../icons/Avatar";
import { logout } from "@/src/lib/features/auth/authOperations";
import Image from "next/image";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  console.log(user);

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-[#373b53] text-white md:w-[103px] h-svh fixed top-0 rounded-r-[1.25rem] z-20">
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

            {user && !loading && (
              <>
                <li className="hover:text-primary transition duration-200 ease-in-out text-lg">
                  <Link href="/invoices">Invoices</Link>
                </li>

                <li className="text-red-medium hover:text-red-light transition duration-200 ease-in-out text-lg">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}

            {!user && !loading && (
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
            <div className="w-5 h-5 flex justify-center items-center text-[#858BB2]">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex justify-center w-full py-[26px]">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
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
