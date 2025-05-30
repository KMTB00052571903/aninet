import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { app } from "../firebase/firebase-config";

const auth = getAuth(app);

let currentUser: User | null = null;

export function initAuth(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    callback(user);
  });
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function getCurrentUser() {
  return currentUser;
}