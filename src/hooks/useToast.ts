import { useState, useEffect } from "react";
import { useAppDispatch } from "../lib/hooks";
import { resetErrors } from "../lib/features/auth/authSlice";

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "danger" | "warning" | "email"
  >("email");

  const dispatch = useAppDispatch();

  const showToast = (
    message: string,
    type: "success" | "danger" | "warning" | "email"
  ) => {
    setToastMessage(message);
    setToastType(type);
  };

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

  return { toastMessage, toastType, showToast };
};
