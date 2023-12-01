import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from './src/Navigation/Navigation';
import initializeResources from './src/Utils/initializeResources';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import defaultStore from './src/Stores/defaultStore';
import AuthProvider from './src/Utils/AuthProvider';

export default function App() {
  const loadingComplete = initializeResources();
  const loadingUser = defaultStore(state => state.loadingUser); //when auth is done with the initial check

  useEffect(() => {
    if (loadingUser || !loadingComplete) return;
    setTimeout(() => {
      SplashScreen.hideAsync().catch((e) => console.log(e));
    }, 500);
  }, [loadingUser, loadingComplete]);

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
