import UUID from 'react-native-uuid';
import { db, storage } from '../../firebaseConfig';
import { getStorage, ref, getDownloadURL, uploadString, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { where, addDoc, collection, doc, getDoc, getDocs, QueryConstraint, getFirestore, query, setDoc, QueryFieldFilterConstraint, updateDoc, orderBy } from 'firebase/firestore';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { Poll, PollWithUser, Question, ResizeOptions, Vote } from '../types';

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

export async function fetchPollsByUser(user_id: string): Promise<Poll[]> {
  try {
    const collectionRef = collection(db, 'polls');
    const q = query(collectionRef, where("user_id", "==", user_id), orderBy('creation_date', 'desc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    } else {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Poll;
      });
    }

  } catch (e) {
    console.log(e);
    return [];
  }
};



export async function fetchPolls(): Promise<Poll[]> {
  try {
    const collectionRef = collection(db, 'polls');
    const q = query(collectionRef, orderBy('creation_date', 'desc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    } else {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Poll;
      });
    }

  } catch (e) {
    console.log(e);
    return [];
  }
};

export async function fetchQuestions(): Promise<Question[]> {
  try {
    const collectionRef = collection(db, 'questions');
    const q = query(collectionRef, orderBy('creation_date', 'desc'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    } else {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as Question;
      });
    }

  } catch (e) {
    console.log(e);
    return [];
  }
};

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

export async function createPoll(data: Poll): Promise<Poll | null> {
  try {
    // const storage = getStorage();
    // const imgUploadPromises = data.options.map(async (o, index) => {
    //   if (o.type === 'image' && o.image) {
    //     const optionId = generateUUID();
    //     const imageRef = ref(storage, optionId);
    //     const finalUri = await resizeImage(540, 720, o.image);
    //     if (!finalUri) return null;
    //     const blob = await uriToBlob(finalUri);
    //     const imageSnapshot = await uploadBytes(imageRef, blob);
    //     const downloadURL = await getDownloadURL(imageSnapshot.ref);
    //     return { index, downloadURL, optionId };
    //   }
    //   return null;
    // });

    // const imgUris = await Promise.all(imgUploadPromises);

    // const newPoll: Poll = {
    //   id: generateUUID(),
    //   user_id: data.user_id,
    //   question: data.question,
    //   options: data.options.map((o, index) => {
    //     const imgUriObj = imgUris.find(uriObj => uriObj && uriObj.index === index);
    //     return {
    //       id: imgUriObj ? imgUriObj.optionId : generateUUID(),
    //       text: o.text,
    //       image: imgUriObj ? imgUriObj.downloadURL : null,
    //       type: o.type
    //     };
    //   }),
    //   color: data.color,
    //   creation_date: new Date().getTime(),
    //   votes: data.options.map(() => 0)
    // };

    const docRef = doc(collection(db, 'polls'), data.id);
    await setDoc(docRef, data);
    return data;
  } catch (e) {
    console.error('Error in createPoll: ', e);
    return null;
  }
}

export async function fetchMyVote(user_id: string, poll_id: string): Promise<Vote | null> {
  try {
    const collectionRef = collection(db, 'votes');
    const q = query(collectionRef, where('user_id', '==', user_id), where('poll_id', '==', poll_id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return querySnapshot.docs[0].data() as Vote;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}

export async function updateRecord<T>(collection_id: string, record_id: string, data: any): Promise<boolean> {
  try {
    const docRef = doc(collection(db, collection_id), record_id);
    await updateDoc(docRef, data);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}

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

