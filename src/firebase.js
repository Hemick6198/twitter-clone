import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqnQGIssDPE2B3-WJfjnsua2OK6TAKRh4",
  authDomain: "twitter-clone-9ff3c.firebaseapp.com",
  projectId: "twitter-clone-9ff3c",
  storageBucket: "twitter-clone-9ff3c.appspot.com",
  messagingSenderId: "392023821236",
  appId: "1:392023821236:web:32a41ec27926221d1b40e1",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export {db, storage };