"use client";

import { useState } from "react";
import Image from "next/image";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import Avatar from "@/src/icons/Avatar";
import Toast from "../Toast/Toast";

export default function AvatarUpload() {
  const { user, handleAvatarUpload, showToast, toastMessage, toastType } =
    useAccountActions();
  const [photoURL, setPhotoURL] = useState(user?.photoURL);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !user?.uid) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files are allowed.", "danger");
      return;
    }

    const newPhotoURL = await handleAvatarUpload(file, user.uid);
    if (newPhotoURL) {
      setPhotoURL(newPhotoURL);
    }
  };

  return (
    <div className="relative w-14 h-14 lg:w-20 lg:h-20">
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
      </div>

      <label
        htmlFor="avatarUploadButton"
        className="absolute w-full h-full top-0 left-0 flex items-center justify-center z-20 text-heading-s-variant text-white/0 bg-dark/0 hover:bg-dark/40 hover:text-white/100 rounded-full cursor-pointer transition duration-200 ease-in-out"
      >
        Upload
        <input
          id="avatarUploadButton"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}
    </div>
  );
}
