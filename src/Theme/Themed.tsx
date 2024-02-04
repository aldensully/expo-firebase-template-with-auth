import { StyleSheet, Text as DefaultText, useColorScheme, View as DefaultView, Pressable, PressableProps, GestureResponderEvent, ActivityIndicator, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LightTheme, DarkTheme } from './themes';
import { ReactElement } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';
  if (theme === 'light') {
    return LightTheme.colors;
  } else {
    return DarkTheme.colors;
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
type TextType = 'h1' | 'h2' | 'h3' | 'p' | 'sm' | 'xs';
type TextVariant = {
  type?: TextType;
  color?: string;
};

const textSizes = {
  xs: {
    fontSize: 13,
    // lineHeight: 14,
    // fontWeight: '400'
  },
  sm: {
    fontSize: 15,
    // lineHeight: 14,
    // fontWeight: '400'
  },
  p: {
    fontSize: 17,
    // lineHeight: 20,
    // fontWeight: '400'
  },
  h1: {
    fontSize: 28,
    // lineHeight: 28,
    // fontWeight: '700'
  },
  h2: {
    fontSize: 24,
    // lineHeight: 24,
    // fontWeight: '600'
  },
  h3: {
    fontSize: 20,
    // lineHeight: 20,
    // fontWeight: '600'
  }
};

const androidFontFamilies = {
  xs: 'Inter-Regular',
  sm: 'Inter-Regular',
  p: 'Inter-Regular',
  h1: 'Inter-Bold',
  h2: 'Inter-SemiBold',
  h3: 'Inter-Medium'
};
const iosFontFamilies = {
  xs: 'SF-Pro-Regular',
  sm: 'SF-Pro-Regular',
  p: 'SF-Pro-Regular',
  h1: 'SF-Pro-Bold',
  h2: 'SF-Pro-SemiBold',
  h3: 'SF-Pro-Medium'
};

function getFontFamily(type: TextType) {
  if (Platform.OS === 'ios') {
    return iosFontFamilies[type];
  } else {
    return androidFontFamilies[type];
  }
}

export function Text(props: TextProps & TextVariant) {
  const colors = useThemeColor();
  const { style, type = 'p', color = colors.primaryText, ...otherProps } = props;

  return <DefaultText style={[{
    color,
    fontSize: textSizes[type].fontSize,
    fontFamily: getFontFamily(type),
  }, style]} {...otherProps} />;
}

type MyViewProps = {
  showInsetTop?: boolean;
};

export function View(props: PressableProps & MyViewProps) {
  const { ...otherProps } = props;
  const { top: paddingTop } = useSafeAreaInsets();

  return <Pressable
    style={[{
      paddingTop: props.showInsetTop ? paddingTop : 0
    }]} {...otherProps} />;
}

type MyButtonProps = {
  type?: 'primary' | 'secondary';
  loading?: boolean;
  title?: string | undefined;
  sizeVariant?: 'medium' | 'large';
  children?: ReactElement;
};

export function Button(props: PressableProps & ViewProps & MyButtonProps) {
  const { style, loading = false, sizeVariant = 'medium', title, disabled, type = 'default', onPress, children, ...otherProps } = props;
  const colors = useThemeColor();

  const textColors = {
    primary: colors.primaryButtonText,
    secondary: colors.primaryText,
    default: colors.primaryText
  };

  const bgColors = {
    primary: colors.secondary,
    secondary: colors.surface3,
    default: 'transparent'
  };

  const borderVariants = {
    round: 50,
    square: 12
  };

  const sizeVariants = {
    medium: '50%',
    large: '100%'
  };

  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress && onPress(e);
  };

  return <Pressable
    onPress={handlePress}
    style={[styles.buttonStyle,
    {
      backgroundColor: bgColors[type],
      opacity: disabled ? 0.4 : 1
    },
      style]}
    {...otherProps}
  >
    {loading ?
      <ActivityIndicator color={textColors[type]} size='small' />
      :
      title ? <Text
        type='h2'
        color={textColors[type]}
      >
        {title}
      </Text> :
        children
    }
  </Pressable>;
}

type ContainerProps = {
  showInsetTop?: boolean;
  showInsetBottom?: boolean;
  backgroundColor?: string;
  children?: React.ReactNode;
};

export const Container = (props: ContainerProps) => {
  const { showInsetTop, showInsetBottom, backgroundColor, children } = props;
  const colors = useThemeColor();
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View style={{
      flex: 1,
      paddingTop: showInsetTop ? top : 0,
      paddingBottom: showInsetBottom ? bottom : 0,
      backgroundColor: backgroundColor ?? colors.surface1
    }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});