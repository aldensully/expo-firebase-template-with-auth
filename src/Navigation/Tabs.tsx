import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../Screens/FeedScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { TabScreens } from '../types';

const Tab = createBottomTabNavigator<TabScreens>();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({})

