"use client";

import { useState } from "react";
import Image from "next/image";
import Avatar from "@/src/icons/Avatar";
import { updateUserProfile } from "@/src/lib/features/auth/authOperations";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { storage } from "@/src/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AvatarUpload() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `avatars/${user?.uid}`);
      const snapshot = await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);
      setPhotoURL(downloadURL);
      await dispatch(updateUserProfile({ photoURL: downloadURL }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div className="relative w-14 h-14 lg:w-20 lg:h-20">
      <div className="relative w-full">
        {photoURL ? (
          <Image
            src={photoURL}
            alt="User avatar"
            className="w-14 h-14 lg:w-20 lg:h-20 rounded-full"
            width={80}
            height={80}
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
          onChange={handleAvatarUpload}
        />
      </label>
    </div>
  );
}
