import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from ".";

const firebaseAuth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export async function createUser() {}

export async function getUser() {
  const user = firebaseAuth.currentUser;

  return user
    ? {
        email: user.email,
        id: user.email,
        username: user.displayName,
        imageAvatar: user.photoURL,
      }
    : null;
}

export async function createSessionWithGoogle() {
  const { user } = await signInWithPopup(firebaseAuth, googleProvider);

  return {
    email: user.email,
    id: user.email,
    username: user.displayName,
    imageAvatar: user.photoURL,
  };
}

export async function deleteSession() {
  return signOut(firebaseAuth);
}
