import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { navigate } from "./actions";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export async function handleAddOrUpdateTransaction(
  title,
  amount,
  date,
  type,
  id,
  uid
) {
  if (id) {
    await updateDoc(doc(db, "users", uid, "transactions", id), {
      title: title,
      amount: amount,
      date: date,
      type: type,
      memo: title,
    });
  } else {
    await addDoc(collection(db, "users", uid, "transactions"), {
      title: title,
      amount: amount,
      date: date,
      type: type,
      memo: title,
    });
  }
  navigate();
}
