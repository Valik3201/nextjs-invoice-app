import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

interface SignInResult {
  result: any;
  error: any;
}

export default async function signIn(
  email: string,
  password: string
): Promise<SignInResult> {
  let result: any = null,
    error: any = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
