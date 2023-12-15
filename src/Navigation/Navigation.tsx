import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationScreens } from '../types';
import WelcomeScreen from '../Screens/Onboarding/WelcomeScreen';
import { navigationRef } from './NavigationRef';
import { LightTheme } from '../Theme/themes';
import BackButton from '../Components/BackButton';
import CloseButton from '../Components/CloseButton';
import defaultStore from '../Stores/defaultStore';
import Home from '../Screens/Home';
import OnboardingTheme from '../Screens/Onboarding/OnboardingTheme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuScreen from '../Screens/MenuScreen';
import CustomizeScreen from '../Screens/CustomizeScreen';
import NewPage from '../Screens/NewPage';

const Stack = createNativeStackNavigator<NavigationScreens>();
const Drawer = createDrawerNavigator<NavigationScreens>();
const renderCloseButton = () => <CloseButton navigate={true} />;
const renderBackButton = () => <BackButton navigate={true} />;

const Navigation = () => {
  const user = defaultStore(state => state.user);
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={LightTheme}
    >
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          name="Main"
          component={Main}
        />
        <Stack.Screen options={{ presentation: 'modal', animation: 'slide_from_bottom' }} name="CustomizeScreen" component={CustomizeScreen} />
        <Stack.Screen options={{ animation: 'slide_from_right', headerShown: false }} name="NewPage" component={NewPage} />
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="OnboardingTheme" component={OnboardingTheme} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Main = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <MenuScreen />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}
    // screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen options={{ drawerPosition: 'right' }} name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});