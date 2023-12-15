import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBhWckTDfTs0K7BbkQalqqZ54_fh5Ey8yg",
  authDomain: "lately-fee7e.firebaseapp.com",
  projectId: "lately-fee7e",
  storageBucket: "lately-fee7e.appspot.com",
  messagingSenderId: "924751925275",
  appId: "1:924751925275:web:461c63bf3406a6139e28be"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});