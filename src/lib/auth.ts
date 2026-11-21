
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";

function requireFirebase() {
  if (!auth || !db) {
    throw new Error(
      "Firebase is not configured. Please add your Firebase environment variables."
    );
  }

  return { auth, db };
}

// REGISTER NEW USER
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const { auth, db } = requireFirebase();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name.trim(),
  });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: name.trim(),
    email: user.email,
    photoURL: null,
    bio: "",
    accountStatus: "active",
    preferences: {
      theme: "dark",
    },
    createdAt: serverTimestamp(),
  });

  return user;
}

// LOGIN
export async function loginUser(
  email: string,
  password: string
) {
  const { auth } = requireFirebase();

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return userCredential.user;
}

// LOGOUT
export async function logoutUser() {
  const { auth } = requireFirebase();

  await signOut(auth);
}

// RESET PASSWORD
export async function resetPassword(email: string) {
  const { auth } = requireFirebase();

  await sendPasswordResetEmail(auth, email.trim());
}
