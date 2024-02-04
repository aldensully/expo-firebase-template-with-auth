import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from './themes';
import store from '../Stores/themeStore';

const useTheme = () => {
  const theme = store(state => state.theme);
  const setTheme = store(state => state.setTheme);

  const getStorageTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      if (theme !== null) {
        handleSetTheme(theme);
      } else {
        handleSetTheme('light');
      }
    } catch (e) {
      // error reading value
      console.log("ERROR SETTING THEME", e);
    }
  };

  const handleSetTheme = (t: string) => {
    switch (t) {
      case 'light':
        setTheme(LightTheme);
        AsyncStorage.setItem('theme', 'light');
        break;
      case 'dark':
        setTheme(DarkTheme);
        AsyncStorage.setItem('theme', 'dark');
        break;
      default:
        setTheme(LightTheme);
        AsyncStorage.setItem('theme', 'light');
    }
  };

  return {
    theme: theme,
    setTheme: handleSetTheme
  };
};
export default useTheme;