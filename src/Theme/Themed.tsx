import { StyleSheet, Text as DefaultText, useColorScheme, View as DefaultView, Pressable, PressableProps, GestureResponderEvent, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LightTheme } from './themes';
import { ReactElement } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';

  return LightTheme.colors;
  // if (theme === 'light') {
  //   return LightTheme.colors;
  // } else {
  //   return DarkTheme.colors;
  // }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
type TextVariant = {
  type?: 'xs' | 'sm' | 'p' | 'h1' | 'h2' | 'h3';
  color?: string;
};

const textSizes = {
  xs: {
    fontSize: 13,
    // lineHeight: 14,
    // fontWeight: '400'
  },
  sm: {
    fontSize: 14,
    // lineHeight: 14,
    // fontWeight: '400'
  },
  p: {
    fontSize: 16,
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

const fontFamilies = {
  // xs: 'Nunito-Bold',
  // sm: 'Nunito-Bold',
  // p: 'Nunito-SemiBold',
  // h1: 'Nunito-Black',
  // h2: 'Nunito-ExtraBold',
  // h3: 'Nunito-ExtraBold'
  xs: 'SingleDay',
  sm: 'SingleDay',
  p: 'SingleDay',
  h1: 'SingleDay',
  h2: 'SingleDay',
  h3: 'SingleDay'
};

export function Text(props: TextProps & TextVariant) {
  const colors = useThemeColor();
  const { style, type = 'p', color = colors.primaryText, ...otherProps } = props;

  return <DefaultText style={[{
    color,
    fontSize: textSizes[type].fontSize,
    fontFamily: fontFamilies[type],
    // fontWeight: textSizes[type].fontWeight as '400' | '500' | '600' | '700'
  }, style]} {...otherProps} />;
}

type MyViewProps = {
  showInsetTop?: boolean;
};

export function View(props: PressableProps & MyViewProps) {
  const { ...otherProps } = props;
  const { top: paddingTop } = useSafeAreaInsets();
  const { surface1 } = useThemeColor();

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
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});