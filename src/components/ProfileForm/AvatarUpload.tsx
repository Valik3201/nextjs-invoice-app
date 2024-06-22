"use client";

import { ChangeEvent, RefObject } from "react";

export default function AvatarUpload({
  fileInputRef,
  handleFileChange,
}: {
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      ref={fileInputRef}
      id="avatarInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
  );
}
