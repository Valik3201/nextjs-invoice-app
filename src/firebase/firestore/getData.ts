import firebaseApp from "../../config";
import {
  getFirestore,
  getDoc,
  doc,
  DocumentSnapshot,
  Firestore,
} from "firebase/firestore";

const db: Firestore = getFirestore(firebaseApp);

interface GetDocumentResult {
  result: DocumentSnapshot<unknown> | null;
  error: any;
}

export default async function getDocument(
  collection: string,
  id: string
): Promise<GetDocumentResult> {
  const docRef = doc(db, collection, id);

  let result: DocumentSnapshot<unknown> | null = null;
  let error: any = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
