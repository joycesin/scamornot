import firebase_app from "../config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(collectionParam: string, data: any) {
  let result = null;
  let error = null;

  try {
    console.log("addData: ", db, collectionParam, data);
    result = await setDoc(doc(collection(db, collectionParam)), data, {
      merge: true,
    });
    console.log("result: " + result);
  } catch (e) {
    error = e;
    console.log("error: ", e);
  }
  console.log("addData result: ", result);
  return { result, error };
}
