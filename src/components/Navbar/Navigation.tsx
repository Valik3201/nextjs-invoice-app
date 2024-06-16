"use client";

import Link from "next/link";
import { useAppSelector } from "../../lib/hooks";
import Avatar from "../../icons/Avatar";
import AuthLinks from "./AuthLinks";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
import UserLinks from "./UserLinks";

export default function Navigation() {
  const { user, refreshing } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-[#373b53] text-white w-full lg:w-[103px] h-[72px] md:h-20 lg:h-svh fixed top-0 lg:rounded-r-[1.25rem] z-20">
      <div className="flex flex-row lg:flex-col justify-between h-full text-body md:text-heading-s-variant">
        <div className="flex flex-row lg:flex-col gap-6">
          <Link href="/">
            <Logo />
            <span className="sr-only">Home</span>
          </Link>

          <ul className="flex flex-row lg:flex-col gap-2 md:gap-4 w-full items-center">
            <li className="hover:text-primary transition duration-200 ease-in-out ">
              <Link href="/">Home</Link>
            </li>

            {!user || refreshing ? <AuthLinks /> : <UserLinks />}
          </ul>
        </div>

        <div className="flex flex-row lg:flex-col items-center divide-x-2 lg:divide-x-0 lg:divide-y-2 divide-[#494e6e]">
          <div className="flex justify-center w-full pe-6 lg:pe-0 lg:py-7">
            <div className="w-5 h-5 flex justify-center items-center text-[#858BB2]">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-full py-8 px-6 lg:py-[26px]">
            {user && !refreshing ? <UserAvatar user={user} /> : <Avatar />}
          </div>
        </div>
      </div>
    </nav>
  );
}
