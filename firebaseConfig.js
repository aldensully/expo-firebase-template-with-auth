import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAnLdqoqjdeeTkVqiJvLToGVoq6sMcKUco",
  authDomain: "polly-27840.firebaseapp.com",
  projectId: "polly-27840",
  storageBucket: "polly-27840.appspot.com",
  messagingSenderId: "1069534699687",
  appId: "1:1069534699687:web:3497c23a5429875a127b82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});