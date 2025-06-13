
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

  
  const firebaseConfig = {
  apiKey: "AIzaSyDhgpeCNHeAoLv5dwGoIXGKT-EW5IssZtM",
  authDomain: "aninet-a8d5b.firebaseapp.com",
  projectId: "aninet-a8d5b",
  storageBucket: "aninet-a8d5b.firebasestorage.app",
  messagingSenderId: "889720773521",
  appId: "1:889720773521:web:099812ba985ac9ca7a5830",
  databaseURL: "https://aninet-a8d5b-default-rtdb.firebaseio.com"  // Url de la base de datos

  };

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export default app;