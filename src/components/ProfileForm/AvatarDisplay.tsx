import Image from "next/image";
import Avatar from "@/src/icons/Avatar";

export default function AvatarDisplay({
  photoURL,
}: {
  photoURL: string | null;
}) {
  return (
    <div className="relative w-14 h-14 lg:w-20 lg:h-20">
      {photoURL ? (
        <Image
          src={photoURL}
          alt="User avatar"
          className="rounded-full object-cover"
          sizes="100%"
          fill
        />
      ) : (
        <Avatar size="lg" />
      )}
      <label
        htmlFor="avatarInput"
        className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-20 text-heading-s-variant text-white/0 bg-dark/0 hover:bg-dark/40 hover:text-white/100 rounded-full cursor-pointer transition duration-200 ease-in-out"
      >
        Upload
      </label>
    </div>
  );
}
