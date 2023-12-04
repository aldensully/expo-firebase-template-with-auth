import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../Screens/FeedScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { TabScreens } from '../types';
import CreatePollScreen from '../Screens/CreatePollScreen';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useThemeColor } from '../Theme/Themed';
import defaultStore from '../Stores/defaultStore';
import Thumbnail from '../Components/Thumbnail';
import FeedIcon from '../../assets/icons/FeedIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PlusIcon from '../../assets/icons/PlusIcon';
import FeedFillIcon from '../../assets/icons/FeedFillIcon';


const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator<TabScreens>();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerTitleStyle: { fontFamily: 'Nunito-Black' },
        headerShadowVisible: false,
        headerTitleAlign: 'center'
      }}
    >
      <Tab.Screen name="Feed" options={{ headerShown: false }} component={FeedScreen} />
      <Tab.Screen name="Plus" component={EmptyScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const icons = {
  Feed: {
    line: FeedIcon,
    fill: FeedFillIcon
  },
  Plus: {
    line: PlusIcon,
    fill: PlusIcon
  },
  Profile: {
    line: ProfileIcon,
    fill: ProfileIcon
  }
};

const RenderTabIcon = ({ isFocused, route }: { isFocused: boolean; route: keyof typeof icons; }) => {
  const colors = useThemeColor();
  const Comp = isFocused ? icons[route].fill : icons[route].line;
  const user = defaultStore(state => state.user);
  if (route === 'Profile' && user) {
    return <Thumbnail id={user.id} username={user.username} size='md' />;
  }
  return (
    <Comp size={36} color={colors.primaryText} />
  );
};


const BottomTabBar = (props: BottomTabBarProps) => {
  const colors = useThemeColor();
  const { bottom: offsetBottom } = useSafeAreaInsets();
  const animTranslateY = useSharedValue(0);
  const tabBarSize = offsetBottom + 56;
  const { bottom } = useSafeAreaInsets();
  // const scrollToExploreTop = defaultStore(state => state.scrollToExploreTop);
  // const scrollToProfileTop = defaultStore(state => state.scrollToProfileTop);

  const animTabBarStyle = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: bottom,
      paddingHorizontal: '10%',
      borderTopWidth: 1,
      borderTopColor: colors.surface2,
      justifyContent: 'space-evenly',
    }}>
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;
        return (
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              if (route.name === 'Plus') {
                props.navigation.navigate('CreatePoll');
                return;
              }
              props.navigation.navigate(route.name);
            }}
            style={{
              height: 60,
              width: 60,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            key={route.key}
          >
            <RenderTabIcon route={route.name as any} isFocused={isFocused} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({})

