import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../../config";

const auth = getAuth(firebase_app);

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
