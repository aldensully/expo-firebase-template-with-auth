/*
A bottom sheet component that can be used to display information. Animated and draggable
*/
import { Modal, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, useThemeColor } from '../Theme/Themed';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import CloseButton from './CloseButton';

type ActionProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  height?: number;
  touchClose?: boolean;
  gestureEnabled?: boolean;
  showBackDrop?: boolean;
  children?: React.ReactNode;
  backgroundColor?: string;
  showHeader?: boolean;
};

const BottomSheet = (props: ActionProps) => {
  const { open, showHeader = true, showBackDrop = true, backgroundColor, onClose, touchClose, gestureEnabled, height = 450, title, children } = props;
  const transY = useSharedValue(height);
  const bgOpacity = useSharedValue(0);
  const colors = useThemeColor();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (open) {
      setModalOpen(true);
      bgOpacity.value = withTiming(0.7, { duration: 300 });
      transY.value = withSpring(0, { damping: 30, stiffness: 300 });
    } else {
      bgOpacity.value = withTiming(0, { duration: 300 });
      transY.value = withSpring(height, { damping: 30, stiffness: 300 });
      setTimeout(() => {
        setModalOpen(false);
      }, 300);
    }
  }, [open, height]);

  const animViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transY.value }],
      backgroundColor: backgroundColor ?? colors.surface2,
      borderTopRightRadius: 24,
      borderCurve: 'continuous',
      borderTopLeftRadius: 24,
      width: '100%',
      overflow: 'hidden',
      maxHeight: height,
      minHeight: height,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const bgStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      backgroundColor: showBackDrop ? `rgba(0,0,0,${bgOpacity.value})` : 'transparent',
    };
  }, [showBackDrop]);

  const handleSave = () => {
    //save location
    transY.value = withSpring(450, { damping: 30, stiffness: 400 });
    bgOpacity.value = withTiming(0, { duration: 100 });
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const gesture = Gesture.Pan().onChange(({ changeX, x, y, translationX, translationY, absoluteX, absoluteY }) => {
    if (translationY < 0) return;
    transY.value = translationY;
  }).onEnd(({ translationX, translationY, velocityX, velocityY, x, absoluteX, oldState }) => {
    if (translationY > 150 || velocityY > 1000) {
      transY.value = withSpring(height, { damping: 30, stiffness: 300 });
      bgOpacity.value = withTiming(0, { duration: 300 });
      scheduleClose();
    } else {
      transY.value = withSpring(0, { damping: 30, stiffness: 400 });
    }
  })
    .runOnJS(true)
    .enabled(gestureEnabled ?? true);

  const handleCloseAnim = () => {
    transY.value = withSpring(height, { damping: 30, stiffness: 300 });
    bgOpacity.value = withTiming(0, { duration: 300 });
  };

  const scheduleClose = () => {
    onClose();
  };

  const dispatchClose = () => {
    handleCloseAnim();
    scheduleClose();
  };

  return (
    <Modal
      visible={modalOpen}
      transparent
      presentationStyle='overFullScreen'
    >
      <Animated.View style={bgStyle}>
        <Pressable
          disabled={!touchClose}
          onPress={dispatchClose}
          style={{ zIndex: -1, flex: 1, position: 'absolute', backgroundColor: 'transparent', left: 0, top: 0, right: 0, bottom: 0 }}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={animViewStyle}>
            {showHeader && <View style={{ paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
              <View style={{ width: 32, height: 32 }} />
              {title ? <Text color={colors.primaryText} type='h2'>{title}</Text> : <View />}
              <CloseButton
                onPress={dispatchClose}
              />
            </View>
            }
            {children}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;