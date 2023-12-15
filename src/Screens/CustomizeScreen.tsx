import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Container, Text, useThemeColor } from '../Theme/Themed';
import { ScreenProps } from '../types';

const CustomizeScreen = ({ navigation, route }: ScreenProps<'CustomizeScreen'>) => {
  const colors = useThemeColor();
  return (
    <Container>
    </Container>
  );
};

export default CustomizeScreen;

const styles = StyleSheet.create({});