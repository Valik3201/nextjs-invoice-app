"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppStore } from "@/src/lib/hooks";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import AvatarUploadAndCrop from "@/src/components/ProfileForm/AvatarUploadAndCrop";
import DisplayNameForm from "@/src/components/ProfileForm/DisplayNameForm";
import EmailForm from "@/src/components/ProfileForm/EmailForm";
import SecurityForm from "@/src/components/ProfileForm/SecurityForm";
import ImageCropProvider from "@/src/providers/ImageCropProvider";

export default function Page() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const store = useAppStore();
  const initialize = useRef(false);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    if (!initialize.current) {
      store.dispatch(resetErrors());
      initialize.current = true;
    }
  }, [store]);

  return (
    <>
      <div className="flex justify-between items-center mb-8 md:mb-10 lg:mb-14">
        <div>
          <h1 className="text-heading-m md:text-heading-l mb-[6px]">Profile</h1>
          <p className="text-body-variant text-gray-medium dark:text-gray-light">
            Your personal account
          </p>
        </div>

        <ImageCropProvider>
          <AvatarUploadAndCrop />
        </ImageCropProvider>
      </div>

      <DisplayNameForm />

      <EmailForm />

      <SecurityForm />
    </>
  );
}
