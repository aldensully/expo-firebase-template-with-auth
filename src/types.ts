import { NativeStackScreenProps } from '@react-navigation/native-stack';

//main stack
export type NavigationScreens = {
  Tabs: undefined;
  Welcome: undefined;
  CreateAccount: undefined;
  Settings: undefined;
  CreatePoll: undefined;
};

//bottom tab screens
export type TabScreens = {
  Feed: undefined;
  Plus: undefined;
  Profile: undefined;
};

//screen props
// export type ScreenProps = NativeStackScreenProps<RootStackParamList<T>>;
export type ScreenProps<Screen extends keyof NavigationScreens> = NativeStackScreenProps<NavigationScreens, Screen>;
export type TabScreenProps<Screen extends keyof TabScreens> = NativeStackScreenProps<TabScreens, Screen>;

export type User = {
  id: string;
  username: string;
  creation_date: string;
};

export type Option = {
  id: string,
  type: 'text' | 'image',
  image: string | null,
  text: string | null;
};

export type Poll = {
  id: string;
  question: string;
  options: Option[];
  votes: number[];
  user_id: string;
  color: string | null;
  creation_date: number;
};

export type Question = {
  id: string;
  question: string;
  image: string | null;
  options: Option[];
  votes: number[];
  type: 'poll' | 'binary' | 'text' | 'image' | 'draw' | 'audio' | 'fillInTheBlank';
  color: string | null;
  user_id: string;
  creation_date: number;
};

export type PollWithUser = {
  poll: Poll;
  user: User;
};

export type Vote = {
  id: string;
  poll_id: string;
  option_id: string;
  user_id: string;
};

export type IconProps = {
  color?: string;
  size: number;
};

export type ResizeOptions = {
  width: number;
  height: number;
};

