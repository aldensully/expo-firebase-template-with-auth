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
import CreatePollScreen from '../Screens/CreatePollScreen';
import defaultStore from '../Stores/defaultStore';

const Stack = createNativeStackNavigator<NavigationScreens>();
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
        {user ? <>
          <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="Tabs" component={Tabs} />
          <Stack.Screen
            options={{
              headerTitle: 'Create Poll',
              headerShadowVisible: false,
              headerShown: false,
              headerLeft: renderBackButton
            }}
            name="CreatePoll"
            component={CreatePollScreen}
          />
        </>
          :
          <>
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} name="CreateAccount" component={CreateAccountScreen} />
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} name="Welcome" component={WelcomeScreen} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});