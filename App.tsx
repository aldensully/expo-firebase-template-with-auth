import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navigation/Navigation';
import initializeResources from './src/Utils/initializeResources';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import defaultStore from './src/Stores/defaultStore';
import AuthProvider from './src/Utils/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}