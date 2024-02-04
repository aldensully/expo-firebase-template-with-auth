import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationScreens, TabsScreens } from '../types';
import WelcomeScreen from '../Screens/Onboarding/WelcomeScreen';
import { navigationRef } from './NavigationRef';
import BackButton from '../Components/BackButton';
import CloseButton from '../Components/CloseButton';
import defaultStore from '../Stores/store';
import Home from '../Screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuScreen from '../Screens/MenuScreen';
import useTheme from '../Theme/useTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileSetupScreen from '../Screens/Onboarding/ProfileSetupScreen';

const Stack = createNativeStackNavigator<NavigationScreens>();
const Drawer = createDrawerNavigator<NavigationScreens>();
const Tabs = createBottomTabNavigator<TabsScreens>();
const renderCloseButton = () => <CloseButton navigate={true} />;
const renderBackButton = () => <BackButton navigate={true} />;

//Navigation with Tabs

const Navigation = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
    >
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Tabs" component={TabNavigator} />
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ gestureEnabled: false, animation: 'slide_from_right' }} name="ProfileSetup" component={ProfileSetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const TabNavigator = () => {
  const colors = useTheme().theme.colors;
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface1, position: 'absolute', zIndex: 1000 },
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home'
        }}
        component={Home}
      />
    </Tabs.Navigator>
  );
};


export default Navigation;

const styles = StyleSheet.create({});