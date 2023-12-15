import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import defaultStore from '../Stores/defaultStore';
import { NavigationScreens, User } from '../types';
import { navigationRef } from '../Navigation/NavigationRef';
import { db, auth } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({ children }: any) => {
  const setUser = defaultStore(state => state.setUser);
  const setLoadingUser = defaultStore(state => state.setLoadingUser);
  const setHasAccount = defaultStore(state => state.setHasAccount);

  //uncomment this when you have firebase setup

  async function getDbUser(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: uid,
        ...docSnap.data(),
      } as User;
    }
    return null;
  }

  const handleNavigation = (route: keyof NavigationScreens) => {
    try {
      if (navigationRef?.isReady()) {
        navigationRef?.navigate(route);
      } else {
        setTimeout(() => {
          handleNavigation(route);
        }, 100);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setHasAccount(true);
        const dbUser = await getDbUser(u.uid);
        if (dbUser) {
          setUser(dbUser);
          handleNavigation('Home');
        } else {
          handleNavigation('Welcome');
          Alert.alert('Error', 'User not found, contact support: aw.sullivan17@gmail.com');
        }
      } else {
        setHasAccount(false);
        console.log('no auth user, checking for local user');
        const res = await AsyncStorage.getItem('user');
        if (res === null) {
          handleNavigation('OnboardingTheme');
          setUser(null);
        } else {
          console.log('found local user');
          const usr = JSON.parse(res);
          setUser(usr);
          handleNavigation('Main');
        }
      }
      setLoadingUser(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});