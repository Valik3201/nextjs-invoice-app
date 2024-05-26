import firebaseApp from "../../config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  Auth,
  User,
} from "firebase/auth";

const auth: Auth = getAuth(firebaseApp);

interface SignUpResult {
  result: any;
  error: any;
}

export default async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<SignUpResult> {
  let result: any = null,
    error: any = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      await updateProfile(result.user as User, {
        displayName: displayName,
      });
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
