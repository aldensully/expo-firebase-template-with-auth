import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import defaultStore from '../Stores/defaultStore';
import { User } from '../types';
import { navigationRef } from '../Navigation/NavigationRef';

//import { db, auth } from '../../firebaseConfig';

const AuthProvider = ({ children }: any) => {
  const setUser = defaultStore(state => state.setUser);
  const setLoadingUser = defaultStore(state => state.setLoadingUser);

  //uncomment this when you have firebase setup

  // async function getDbUser(uid: string): Promise<User | null> {
  //   const docRef = doc(db, "users", uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     return {
  //       id: uid,
  //       ...docSnap.data(),
  //     } as User;
  //   }
  //   console.log('did not find user');
  //   return null;
  //   return null
  // }

  // const handleNavigation = (route: string) => {
  //   if (navigationRef?.isReady()) {
  //     navigationRef?.navigate(route as never);
  //   } else {
  //     setTimeout(() => {
  //       handleNavigation(route);
  //     }, 100);
  //   }
  // };

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (u) => {
  //     if (u) {
  //       const dbUser = await getDbUser(u.uid);
  //       if (dbUser) {
  //         setUser(dbUser);
  //         handleNavigation('Tabs');
  //       } else {
  //         handleNavigation('AccountSetup');
  //       }

  //     } else {
  //       console.log('no user');
  //       handleNavigation('Welcome');
  //       setUser(null);
  //     }
  //     setLoadingUser(false);
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});