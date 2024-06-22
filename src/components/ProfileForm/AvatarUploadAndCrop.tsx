import { useState, useRef, ChangeEvent } from "react";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import { useImageCropContext } from "@/src/providers/ImageCropProvider";
import { useToggleState } from "@/src/hooks/useToggleState";
import { readFile } from "@/src/helpers/cropImage";
import AvatarDisplay from "./AvatarDisplay";
import AvatarEditModal from "../Modal/AvatarEditModal";
import AvatarUpload from "./AvatarUpload";
import Toast from "../Toast/Toast";

export default function AvatarUploadAndCrop() {
  const { state: isOpen, toggleState } = useToggleState();
  const { user, handleAvatarUpload, showToast, toastMessage, toastType } =
    useAccountActions();

  const [photoURL, setPhotoURL] = useState<string | null>(
    user?.photoURL ?? null
  );

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        showToast("Only image files are allowed.", "danger");
        return;
      }

      const imageDataUrl = await readFile(file);
      setImage(imageDataUrl as string);
      toggleState();
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    console.log(avatar);

    if (avatar && user?.uid) {
      const newPhotoURL = await handleAvatarUpload(avatar, user.uid);
      if (newPhotoURL) {
        setPhotoURL(newPhotoURL);
      }
    }
    resetStates();
  };

  return (
    <div className="w-20 h-20 rounded-full flex justify-center items-center">
      <AvatarDisplay photoURL={photoURL} />
      <AvatarUpload
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <AvatarEditModal
        isOpen={isOpen}
        toggleState={toggleState}
        handleDone={handleDone}
      />

      {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}
    </div>
  );
}
