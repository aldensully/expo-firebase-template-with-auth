import { Pressable, PressableProps, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '../Theme/Themed';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigate?: boolean;
  onPress?: () => void;
};

const BackButton = (props: Props) => {
  const { onPress, navigate, ...otherProps } = props;
  const colors = useThemeColor();
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigate) {
      navigation.goBack();
    }
    onPress && onPress();
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: 40,
        height: 40,
        marginLeft: -4,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...otherProps}
    >
      <Ionicons name='chevron-back' size={28} color={colors.primaryText} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});