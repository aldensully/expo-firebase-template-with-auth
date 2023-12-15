import { NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LegacyRef } from 'react';
import { TextInput } from 'react-native';

//main stack
export type NavigationScreens = {
  Home: undefined;
  Welcome: undefined;
  Main: undefined;
  OnboardingTheme: undefined;
  CreateAccount: undefined;
  CustomizeScreen: undefined;
  FeedbackScreen: undefined;
  Menu: undefined;
  NewPage: undefined;
};

//screen props
// export type ScreenProps = NativeStackScreenProps<RootStackParamList<T>>;
export type ScreenProps<Screen extends keyof NavigationScreens> = NativeStackScreenProps<NavigationScreens, Screen>;
export type UseNavigationType = NavigationProp<NavigationScreens>;
export type User = {
  id: string;
  username: string;
  creation_date: string;
};

export type Diary = {
  id: string;
  title: string;
  color: string;
  user_id: string;
  pages: Page[];
  creation_date: string;
};

export type ImageShape = 'polaroid' | 'circle' | 'square';

export type PageImageType = {
  id: string;
  x: number;
  y: number;
  z: number;
  shape: ImageShape;
  width: number;
  height: number;
};

export type PageTextType = {
  id: string;
  body: string;
  x: number;
  y: number;
  z: number;
  size: number;
  scale: number;
  align: string;
  color: string;
  font: string;
};

export type PageStickerType = {
  id: string;
  key: string;
  x: number;
  y: number;
  z: number;
  size: number;
};

export type Page = {
  id: string;
  number: string;
  title: string;
  content: string;
  diary_id: string;
  images: PageImageType[];
  texts: PageTextType[];
  stickers: PageStickerType[];
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

