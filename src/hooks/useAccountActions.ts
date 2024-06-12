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
import { useToast } from "./useToast";

export const useAccountActions = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { toastMessage, toastType, showToast } = useToast();

  const handleSaveName = async (values: any, toggleEdit: () => void) => {
    try {
      await dispatch(
        updateUserProfile({ displayName: values.displayName })
      ).unwrap();
      toggleEdit();
      if (user && user.displayName !== values.displayName) {
        showToast("Name successfully updated!", "success");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile", "danger");
    }
  };

  const handleUpdateEmail = async (values: any, toggleEdit: () => void) => {
    try {
      await dispatch(updateUserEmail({ email: values.email })).unwrap();
      toggleEdit();
      if (user && user.email !== values.email) {
        showToast("Email successfully updated!", "success");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      showToast("Error updating email", "danger");
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      await dispatch(sendlVerificationEmail());
      showToast("Verification email sent successfully!", "success");
    } catch (error) {
      console.error("Error sending verification email:", error);
      showToast("Error sending verification email", "danger");
    }
  };

  const handleUpdatePassword = async (values: any, toggleEdit: () => void) => {
    try {
      await dispatch(
        updateUserPassword({ newPassword: values.newPassword })
      ).unwrap();
      toggleEdit();
      showToast("Password successfully updated!", "success");
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("Error updating password", "danger");
    }
  };

  const handleResetPassword = async (values: any, resetForm: () => void) => {
    try {
      await dispatch(resetUserPassword({ email: values.email })).unwrap();
      showToast("Password reset link sent successfully!", "email");
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
      showToast("Avatar updated successfully!", "success");
      return downloadURL;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      showToast("Error uploading avatar", "danger");
      return null;
    }
  };

  return {
    user,
    handleSaveName,
    handleUpdateEmail,
    handleSendVerificationEmail,
    handleUpdatePassword,
    handleResetPassword,
    handleAvatarUpload,
    toastMessage,
    toastType,
    showToast,
  };
};
