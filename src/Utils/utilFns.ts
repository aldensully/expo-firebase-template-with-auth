import UUID from 'react-native-uuid';
// import { ...your imports } from '../../firebaseConfig';
// import { getStorage, ref, getDownloadURL, uploadString, uploadBytesResumable, uploadBytes } from "firebase/storage";
// import {QueryFieldFilterConstrain,where, addDoc, collection, doc, getDoc, getDocs, QueryConstraint, getFirestore, query, setDoc } from 'firebase/firestore';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { ResizeOptions } from '../types';

/* 

generic fetch documents function

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
*/

/*

generic fetch document function by id/path

export async function fetchDocument<T>(path: string): Promise<T | null> {
  try {
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as T;
    }
    return null;
  } catch (e) {
    console.log("ERROR: ", e);
    return null;
  }
}
*/

/*

generic create document function

export async function createRecord<T>(collection_id: string, record_id: string, data: any): Promise<boolean> {
  try {
    const docRef = doc(collection(db, collection_id), record_id);
    await setDoc(docRef, data);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}
*/

/*

generic update document function

export async function updateRecord<T>(collection_id: string, record_id: string, data: any): Promise<boolean> {
  try {
    const docRef = doc(collection(db, collection_id), record_id);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}
*/

/* 

upload media to firebase storage

export async function uploadMedia(id: string, uri: string, resizeOptions?: ResizeOptions): Promise<Boolean> {
  const storage = getStorage();
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
*/

/* 

for fetching thumbnails/images

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
*/

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

