This is a expo template to get you off the ground quickly.
The main stack is Expo/React Native, React Navigation, Firebase, and typescript

Included:
Expo Managed, React Native w/ Typescript
React Navigation - https://reactnavigation.org/
Firebase - https://firebase.google.com/ - see https://docs.expo.dev/guides/using-firebase/
Zustand - state management - https://github.com/pmndrs/zustand
react-native-async-storage - for local storage - https://react-native-async-storage.github.io/async-storage/docs/install/
react-native-svg - for svg icons - use iconbuddy.app for free icons, copy as svg, and past into https://react-svgr.com/playground/?icon=true&native=true&typescript=true.  Copy the output and paste into the icon file in assets/icons
expo-haptics - for haptic feedback - https://docs.expo.dev/versions/latest/sdk/haptics/
expo-splash-screen - for splash screen - https://docs.expo.dev/versions/latest/sdk/splash-screen/
tanstack-query - fetching data / caching / - https://tanstack.com/query/latest/docs/react/installation
expo-image-picker - for image picking - https://docs.expo.dev/versions/latest/sdk/imagepicker/
expo-image-manipulator - resize/compress images for storage uploading
react-native-reanimated - for animations - https://docs.swmansion.com/react-native-reanimated/docs/installation/
react-native-gesture-handler - for animations/gestures - https://docs.swmansion.com/react-native-gesture-handler/docs/

Organization:
- App.tsx //app entry
- src //source code
  - Navigation //navigation setup, ref, and bottom tabs
  - Screens //all app Screens
  - Stores //zustand stores
  - Theme //theme config and themed components
  - Utils //utility functions and hooks
  - types.ts //global types
- assets //images, fonts, and icons
- firebaseConfig.js //firebase config, replace with your own

Architecture / Logic Flow:
- Show splash screen and load resources
- Check if user is logged in
  - If logged in,
    - Check if db user record exists
      - if it does, set user in store and show main app
      - if it doesn't, show account setup screen 
  - If not logged in, show welcome screen
- After loading and user check, hide splash screen

SETUP:
- Clone repo
- Run npm install or yarn install
- Edit the app.json file to change the name, slug, and icon
- Edit the firebaseConfig.js file to add your firebase config. Go to https://firebase.google.com/ and create a new project.  Then go to the project settings and copy the config object into the firebaseConfig.js file. 
- Run "npx expo start"