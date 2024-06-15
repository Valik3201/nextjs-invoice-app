import { User } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/src/icons/Avatar";

export default function UserAvatar({ user }: { user: User }) {
  return (
    <>
      <Link
        href={`/profile/${user?.uid}`}
        className="relative w-8 h-8 lg:w-10 lg:h-10"
      >
        {user?.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User avatar"
            className="rounded-full object-cover"
            width={40}
            height={40}
          />
        ) : (
          <Avatar />
        )}
      </Link>
    </>
  );
}
