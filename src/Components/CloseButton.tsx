import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/icons/BackIcon';
import { useThemeColor } from '../Theme/Themed';
import CloseIcon from '../../assets/icons/CloseIcon';

type Props = {
  navigate?: boolean;
  onPress?: () => void;
};

const CloseButton = (props: Props) => {
  const { onPress, navigate } = props;
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
      }}>
      <CloseIcon size={28} color={colors.primaryText} />
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({});