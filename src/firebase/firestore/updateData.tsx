import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function updateData(
  collectionParam: string,
  data: any,
  firebaseDocId: string
) {
  let result = null;
  let error = null;

  try {
    console.log("updateData: ", db, collectionParam, data);
    result = await updateDoc(doc(db, collectionParam, firebaseDocId), {
      //capital: true
      // update doc with data
      ...data,
    });
    console.log("result: " + result);
  } catch (e) {
    error = e;
    console.log("error: ", e);
  }
  console.log("updateData result: ", result);
  return { result, error };
}
