import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LegacyRef } from 'react';
import { TextInput } from 'react-native';

//main stack
export type NavigationScreens = {
  Welcome: undefined;
  FeedbackScreen: undefined;
  ProfileSetup: undefined;
  Profile: undefined;
  Tabs: undefined; //if using tab navigator
};

export type TabsScreens = {
  Home: undefined;
};

//screen props
// export type ScreenProps = NativeStackScreenProps<RootStackParamList<T>>;
export type ScreenProps<Screen extends keyof NavigationScreens> = NativeStackScreenProps<NavigationScreens, Screen>;
export type TabsScreenProps<Screen extends keyof TabsScreens> = NativeStackScreenProps<TabsScreens, Screen>;
export type UseNavigationType = NavigationProp<NavigationScreens>;
export type UseTabNavigationType = NavigationProp<TabsScreens>;

export type User = {
  id: string;
  username: string;
  creation_date: string;
};

export type IconProps = {
  color?: string;
  size: number;
};

export type ResizeOptions = {
  width: number;
  height: number;
};

