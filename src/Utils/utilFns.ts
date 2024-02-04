import UUID from 'react-native-uuid';
import { db, storage } from '../../firebaseConfig';
import { getStorage, ref, getDownloadURL, uploadString, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { where, addDoc, collection, doc, getDoc, getDocs, QueryConstraint, getFirestore, query, setDoc, QueryFieldFilterConstraint, updateDoc, orderBy } from 'firebase/firestore';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { ResizeOptions } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchDocuments<T>(key: string, queryConstraints: QueryFieldFilterConstraint[]): Promise<T[]> {
  try {
    const collectionRef = collection(db, key);
    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    } else {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as T;
      });
    }

  } catch (e) {
    console.log(e);
    return [];
  }
};

export async function uploadMedia(id: string, uri: string, resizeOptions?: ResizeOptions): Promise<Boolean> {
  const storageRef = ref(storage, id);
  let finalUri = uri;
  if (resizeOptions) {
    const res = await resizeImage(resizeOptions.width, resizeOptions.height, uri);
    if (res) finalUri = res;
    else return false;
  }
  const blob = await uriToBlob(finalUri);
  const res = await uploadBytes(storageRef, blob)
    .then(res => {
      console.log('success', res);
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
  return res;
}

export async function apiFetchStorageUrl(id: string) {
  const storage = getStorage();
  const picRef = ref(storage, id);
  const url = await getDownloadURL(picRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      switch (error.code) {
        case 'storage/object-not-found':
          return null;
        case 'storage/unauthorized':
          return null;
        case 'storage/canceled':
          return null;
        case 'storage/unknown':
          return null;
        default:
          return null;
      }
    });
  return url;
}

export function generateUUID() {
  return UUID.v4().toString();
}

export async function fetchImageFromUri(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export async function resizeImage(width: number, height: number, uri: string) {
  try {
    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { height: height, width: width } }],
      { format: SaveFormat.PNG, compress: 0.2 }
    );
    return manipResult.uri;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function uriToBlob(fileUri: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileUri, true);
    xhr.send(null);
  }) as Promise<Blob>;
}

