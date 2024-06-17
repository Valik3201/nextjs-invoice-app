import { useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/hooks";
import {
  loginWithProvider,
  signIn,
  signUp,
} from "../lib/features/auth/authOperations";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await dispatch(signIn(values)).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLoginWithProvider = async (provider: "google" | "facebook") => {
    try {
      await dispatch(loginWithProvider({ provider })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    }
  };

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { name, email, password } = values;
    try {
      await dispatch(signUp({ email, password, displayName: name })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return { handleLogin, handleLoginWithProvider, handleSignUp };
}
