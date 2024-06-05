import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
} from "@/src/lib/features/auth/authOperations";

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.errors.authError);

  const useEditState = () => {
    const [edit, setEdit] = useState(false);
    const handleToggleEdit = () => setEdit((prevEdit) => !prevEdit);
    return { edit, handleToggleEdit };
  };

  const handleSaveName = async (
    values: any,
    successMessage: string,
    setStatusMessage: (message: string | null) => void,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(
        updateUserProfile({ displayName: values.displayName })
      ).unwrap();
      toggleEdit();
      setStatusMessage(successMessage);
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage(null);
    }
  };

  const handleUpdateEmail = async (
    values: any,
    successMessage: string,
    setStatusMessage: (message: string | null) => void,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(updateUserEmail({ email: values.email })).unwrap();
      toggleEdit();
      setStatusMessage(successMessage);
    } catch (error) {
      console.error("Error updating email:", error);
      setStatusMessage(null);
    }
  };

  const handleUpdatePassword = async (
    values: any,
    successMessage: string,
    setStatusMessage: (message: string | null) => void,
    toggleEdit: () => void
  ) => {
    try {
      await dispatch(
        updateUserPassword({ newPassword: values.newPassword })
      ).unwrap();
      toggleEdit();
      setStatusMessage(successMessage);
    } catch (error) {
      console.error("Error updating password:", error);
      setStatusMessage(null);
    }
  };

  return {
    user,
    error,
    useEditState,
    handleSaveName,
    handleUpdateEmail,
    handleUpdatePassword,
  };
};
