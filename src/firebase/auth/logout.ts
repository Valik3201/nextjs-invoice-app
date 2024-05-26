import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

export default async function logout(): Promise<{
  success: boolean;
  error?: any;
}> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
