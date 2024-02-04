import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

let fonts = {
  'Inter-Regular': require('../../assets/fonts/Inter/Inter-Regular.ttf'),
  'Inter-Bold': require('../../assets/fonts/Inter/Inter-Bold.ttf'),
  'Inter-Black': require('../../assets/fonts/Inter/Inter-Black.ttf'),
  'Inter-ExtraBold': require('../../assets/fonts/Inter/Inter-ExtraBold.ttf'),
  'Inter-ExtraLight': require('../../assets/fonts/Inter/Inter-ExtraLight.ttf'),
  'Inter-Light': require('../../assets/fonts/Inter/Inter-Light.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter/Inter-SemiBold.ttf'),
  'Nunito-Regular': require('../../assets/fonts/Nunito/Nunito-Regular.ttf'),
  'Nunito-Medium': require('../../assets/fonts/Nunito/Nunito-Medium.ttf'),
  'Nunito-SemiBold': require('../../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
  'Nunito-Bold': require('../../assets/fonts/Nunito/Nunito-Bold.ttf'),
  'Nunito-ExtraBold': require('../../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  'Nunito-Black': require('../../assets/fonts/Nunito/Nunito-Black.ttf'),
  "SF-Pro-Rounded-Regular": require("../../assets/fonts/SF-Pro/SF-Pro-Rounded-Regular.otf"),
  "SF-Pro-Rounded-Medium": require("../../assets/fonts/SF-Pro/SF-Pro-Rounded-Medium.otf"),
  "SF-Pro-Rounded-Semibold": require("../../assets/fonts/SF-Pro/SF-Pro-Rounded-Semibold.otf"),
  "SF-Pro-Rounded-Bold": require("../../assets/fonts/SF-Pro/SF-Pro-Rounded-Bold.otf"),
  "SF-Pro-Light": require("../../assets/fonts/SF-Pro/SF-Pro-Text-Light.otf"),
  "SF-Pro-Regular": require("../../assets/fonts/SF-Pro/SF-Pro-Text-Regular.otf"),
  "SF-Pro-Medium": require("../../assets/fonts/SF-Pro/SF-Pro-Text-Medium.otf"),
  "SF-Pro-Semibold": require("../../assets/fonts/SF-Pro/SF-Pro-Display-Semibold.otf"),
  "SF-Pro-Bold": require("../../assets/fonts/SF-Pro/SF-Pro-Display-Bold.otf"),
};


const initializeResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {

        SplashScreen.preventAutoHideAsync();

        //load any resources
        const Promises: Promise<any>[] = [
          Font.loadAsync(fonts)
        ];

        const res = await Promise.allSettled(Promises);

        res.forEach((r) => {
          if (r.status === 'rejected') {
            //handle errors
            console.log(r.reason);
          }
        });
      } catch (e) {
        console.log("ERROR LOADING RESOURCES", e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default initializeResources;