import { NativeStackScreenProps } from '@react-navigation/native-stack';

//main stack
export type NavigationScreens = {
  Tabs: TabScreens;
  Welcome: undefined;
  CreateAccount: undefined;
  Settings: undefined;
};

//bottom tab screens
export type TabScreens = {
  Feed: undefined;
  CreatePoll: undefined;
  Profile: undefined;
};

//screen props
// export type ScreenProps = NativeStackScreenProps<RootStackParamList<T>>;
export type ScreenProps<Screen extends keyof NavigationScreens> = NativeStackScreenProps<NavigationScreens, Screen>;

export type User = {
  id: string;
  username: string;
  creation_date: string;
};

export type IconProps = {
  color: string;
  size: number;
};