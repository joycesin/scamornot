import firebase_app from "../config";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getData(collectionParam: string) {
  const querySnapshot = await getDocs(collection(db, collectionParam));

  let result: any[] = [];
  let error = null;

  try {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      result.push(doc.data()); // Pass the document ID as a string
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
