import { useState, useEffect } from "react";
import { storage } from "@/src/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
  sendlVerificationEmail,
  resetUserPassword,
} from "@/src/lib/features/auth/authOperations";
import { resetErrors } from "../lib/features/auth/authSlice";

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const useEditState = () => {
    const [edit, setEdit] = useState(false);
    const handleToggleEdit = () => setEdit((prevEdit) => !prevEdit);
    return { edit, handleToggleEdit };
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "danger" | "warning" | "email"
  >("email");

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
        setToastType("email");
        dispatch(resetErrors());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  const showToast = (
    message: string,
    type: "success" | "danger" | "warning" | "email"
  ) => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleSaveName = async (
    values: any,
    successMessage: string,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(
        updateUserProfile({ displayName: values.displayName })
      ).unwrap();
      toggleEdit();
      if (user?.displayName !== values.displayName) {
        showToast(successMessage, "success");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile", "danger");
    }
  };

  const handleUpdateEmail = async (
    values: any,
    successMessage: string,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(updateUserEmail({ email: values.email })).unwrap();
      toggleEdit();
      if (user?.email !== values.email) {
        showToast(successMessage, "success");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      showToast("Error updating email", "danger");
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      await dispatch(sendlVerificationEmail());
      showToast("Verification email sent", "success");
    } catch (error) {
      console.error("Error sending verification email:", error);
      showToast("Error sending verification email", "danger");
    }
  };

  const handleUpdatePassword = async (
    values: any,
    successMessage: string,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(
        updateUserPassword({ newPassword: values.newPassword })
      ).unwrap();
      toggleEdit();
      showToast(successMessage, "success");
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("Error updating password", "danger");
    }
  };

  const handleResetPassword = async (
    values: any,
    successMessage: string,
    resetForm: () => void
  ) => {
    try {
      await dispatch(resetUserPassword({ email: values.email })).unwrap();
      showToast(successMessage, "success");
      resetForm();
    } catch (error) {
      console.log("Error sending password reset link:", error);
      showToast(
        "Error sending password reset link. Please try again.",
        "danger"
      );
    }
  };

  const handleAvatarUpload = async (file: File, userId: string) => {
    try {
      const storageRef = ref(storage, `avatars/${userId}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await dispatch(updateUserProfile({ photoURL: downloadURL })).unwrap();
      showToast("Avatar updated successfully", "success");
      return downloadURL;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      showToast("Error uploading avatar", "danger");
      return null;
    }
  };

  return {
    user,
    useEditState,
    handleSaveName,
    handleUpdateEmail,
    handleSendVerificationEmail,
    handleUpdatePassword,
    handleResetPassword,
    handleAvatarUpload,
    showToast,
    toastMessage,
    toastType,
  };
};
