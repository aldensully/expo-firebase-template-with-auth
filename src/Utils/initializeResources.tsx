import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

let fonts = {
  'SingleDay': require('../../assets/fonts/Single_Day/SingleDay-Regular.ttf'),
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