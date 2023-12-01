import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScreenProps } from '../../types';
import { Container, Text } from '../../Theme/Themed';

const WelcomeScreen = ({ navigation, route }: ScreenProps<'Welcome'>) => {
  return (
    <Container>
      <Text type='h1'>WelcomeScreen</Text>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});