import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MenuIcon from '../../assets/icons/MenuIcon';
import { useThemeColor } from '../Theme/Themed';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const MenuButton = () => {
  const colors = useThemeColor();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{
        width: 40,
        height: '100%',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <MenuIcon size={28} color={colors.primaryText} />
    </Pressable>
  );
};

export default MenuButton;

const styles = StyleSheet.create({});