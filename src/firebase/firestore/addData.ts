import firebaseApp from "../../firebase.config";
import { getFirestore, doc, setDoc, Firestore } from "firebase/firestore";

const db: Firestore = getFirestore(firebaseApp);

interface AddDataResult {
  result: any;
  error: any;
}

export default async function addData(
  collection: string,
  id: string,
  data: any
): Promise<AddDataResult> {
  let result: void | null = null;
  let error: any = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
