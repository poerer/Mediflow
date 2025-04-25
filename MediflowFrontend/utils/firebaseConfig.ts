import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSjecSciLApkOmasxuVkRoDJ4rPMYVchI",
  authDomain: "mediflow-e97d3.firebaseapp.com",
  projectId: "mediflow-e97d3",
  storageBucket: "mediflow-e97d3.appspot.com", // ✅ Korrigiert: .appspot.com
  messagingSenderId: "179511557979",
  appId: "1:179511557979:web:f03be1bd7cffae07eea47e",
  measurementId: "G-JXFWVCQX5E"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// 👉 Export Auth (nur das brauchst du für Login/Register)
export const auth = getAuth(app);
export const db = getFirestore(app);


// ❌ Entferne oder sichere Analytics (optional, falls du es brauchst)
// import { getAnalytics } from "firebase/analytics";
// if (typeof window !== "undefined") {
//   const analytics = getAnalytics(app);
// }
