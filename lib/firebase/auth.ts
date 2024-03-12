import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { APIResponse } from "@/types";
import { auth, db } from "./firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with Google
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    // Check if user document exists in Firestore
    const userDocRef = doc(db, "users", userCreds.user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    // If user document doesn't exist, create it
    if (!userDocSnapshot.exists()) {
      const userData = {
        name: userCreds.user.displayName || "",
        email: userCreds.user.email || "",
        id: userCreds.user.uid || "",
      };
      await setDoc(userDocRef, userData);
    }

    // Send ID token to server for further processing
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const resBody = await response.json();
    if (response.ok && resBody.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}
