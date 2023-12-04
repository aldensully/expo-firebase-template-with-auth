import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

let fonts = {
  'Nunito-Regular': require('../../assets/fonts/nunito/Nunito-Regular.ttf'),
  'Nunito-Medium': require('../../assets/fonts/nunito/Nunito-Medium.ttf'),
  'Nunito-SemiBold': require('../../assets/fonts/nunito/Nunito-SemiBold.ttf'),
  'Nunito-Bold': require('../../assets/fonts/nunito/Nunito-Bold.ttf'),
  'Nunito-ExtraBold': require('../../assets/fonts/nunito/Nunito-ExtraBold.ttf'),
  'Nunito-Black': require('../../assets/fonts/nunito/Nunito-Black.ttf'),
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