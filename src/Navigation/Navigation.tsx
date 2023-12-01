import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';
import { NavigationScreens } from '../types';
import WelcomeScreen from '../Screens/Onboarding/WelcomeScreen';
import CreateAccountScreen from '../Screens/Onboarding/CreateAccountScreen';
import { navigationRef } from './NavigationRef';
import { LightTheme } from '../Theme/themes';
import BackButton from '../Components/BackButton';
import CloseButton from '../Components/CloseButton';

const Stack = createNativeStackNavigator<NavigationScreens>();
const renderCloseButton = () => <CloseButton navigate={true} />;
const renderBackButton = () => <BackButton navigate={true} />;

const Navigation = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={LightTheme}
      independent={true}
      linking={undefined}
    >
      <Stack.Navigator initialRouteName='Tabs'>
        <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});