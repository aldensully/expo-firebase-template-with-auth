import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { PageTextType, ScreenProps } from '../types';
import { Container, Text, useThemeColor } from '../Theme/Themed';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UndoIcon from '../../assets/icons/UndoIcon';
import StickerIcon from '../../assets/icons/StickerIcon';
import BackgroundIcon from '../../assets/icons/BackgroundIcon';
import TextIcon from '../../assets/icons/TextIcon';
import ImageIcon from '../../assets/icons/ImageIcon';
import BrushIcon from '../../assets/icons/BrushIcon';
import { generateUUID } from '../Utils/utilFns';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import ColorPicker, { HueSlider, Panel1, Preview } from 'reanimated-color-picker';
import AlignLeftIcon from '../../assets/icons/AlignLeftIcon';
import AlignCenterIcon from '../../assets/icons/AlignCenterIcon';
import AlignRightIcon from '../../assets/icons/AlignRightIcon';

const DoneButton = () => {
  const colors = useThemeColor();
  return (
    <Pressable style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginRight: 10
    }}>
      <Text type='h3' color={colors.primary}>Done</Text>
    </Pressable>
  );
};


const BOTTOM_CONTAINER_HEIGHT = 50;
const { width, height } = Dimensions.get('window');


const NewPage = ({ navigation }: ScreenProps<'NewPage'>) => {
  const { top, bottom } = useSafeAreaInsets();
  const [overlaysShown, setOverlaysShown] = useState(true);
  const [hasBackAction, setHasBackAction] = useState(false);
  const [actions, setActions] = useState<any[]>([]);
  const [texts, setTexts] = useState<PageTextType[]>([]);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [newText, setNewText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [focusedTextId, setFocusedTextId] = useState<string | null>(null);
  const [font, setFont] = useState('SingleDay');
  const [color, setColor] = useState('#000000');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardFocused(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardFocused(false);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);


  const handleUndo = () => {
  };

  const handleTextButtonPress = () => {
    if (keyboardFocused) {
      Keyboard.dismiss();
      return;
    }
    setOpenInput(true);
  };

  const handleInputBlur = () => {
    setColorPickerOpen(false);
    setOpenInput(false);
    if (focusedTextId) {
      const t = texts.find(t => t.id === focusedTextId) ?? null;
      if (!t) return;
      const newT = {
        ...t,
        color,
        font,
        body: newText,
        align
      };
      handleUpdateText(newT);
      setFocusedTextId(null);
      setOpenInput(false);
      setNewText('');
      return;
    }
    const t: PageTextType = {
      id: generateUUID(),
      body: newText,
      color: color,
      font: font,
      align,
      x: width / 4,
      y: height / 2,
      z: 3,
      size: 18,
      scale: 1
    };
    setTexts([...texts, t]);
    setOpenInput(false);
    setNewText('');
  };

  const handleInputFocus = () => {
  };

  const handleImagePickerButtonPress = () => {
  };

  const handleStickerButtonPress = () => {
  };

  const handleBackgroundButtonPress = () => {
  };

  const handlePencilButtonPress = () => {
  };

  const colors = useThemeColor();


  const handleUpdateText = (t: PageTextType) => {
    const newT = texts.map(text => {
      if (text.id === t.id) {
        return t;
      }
      return text;
    });
    setTexts(newT);
  };

  const handleTextFocus = (id: string) => {
    const focused = texts.find(t => t.id === id) ?? null;
    if (!focused) return;
    console.log("FOCUSED");
    setFocusedTextId(focused.id);
    setNewText(focused.body);
    setOpenInput(true);
  };

  return (
    <Container backgroundColor='#fff'>

      {overlaysShown && <Header
        // style={{ position: 'absolute', zIndex: 2 }}
        headerLeft={<BackButton navigate />}
        headerRight={<DoneButton />}
      />
      }
      {openInput &&
        <KeyboardAvoidingView
          behavior={'height'}
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 1000,
            left: 0,
            top: 0,
            right: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            bottom: 0
          }}
        >
          <View style={{ width: '100%', paddingTop: 10, backgroundColor: colors.surface1 }}>
            <TextInput
              numberOfLines={5}
              multiline
              autoFocus
              scrollEnabled={false}
              maxLength={200}
              ref={inputRef}
              value={newText}
              onChangeText={setNewText}
              placeholder='Start typing...'
              placeholderTextColor={colors.secondaryText}
              style={{
                paddingHorizontal: 16,
                minHeight: 36,
                fontFamily: font,
                lineHeight: 22,
                fontSize: 18,
                textAlign: align,
                paddingBottom: 10,
                color: color
              }}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
            />
            <View style={{ height: 40, gap: 10, width: '100%', paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
              {colorPickerOpen && <View style={{
                position: 'absolute',
                zIndex: 1000,
                left: 20,
                bottom: 150,
                width: 200,
                height: 200,
              }}>
                <ColorPicker style={{ gap: 16 }} onChange={(val) => setColor(val.hex)}>
                  <Panel1 style={{ borderRadius: 12 }} />
                  <HueSlider />
                </ColorPicker>
              </View>
              }
              <Pressable
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: color
                }}
                onPress={() => setColorPickerOpen(o => !o)}
              />
              <View style={{ width: 1, height: 20, backgroundColor: colors.surface3 }} />
              <TextAlignContainer align={align} setAlign={setAlign} />
              <View style={{ width: 1, height: 20, backgroundColor: colors.surface3 }} />
              <FontStyleContainer font={font} setFont={setFont} />
              <View style={{ width: 1, height: 20, backgroundColor: colors.surface3 }} />
            </View>
          </View>
        </KeyboardAvoidingView>
      }
      <View style={{ flex: 1, zIndex: 1 }}>
        {texts?.map(t => t.id !== focusedTextId && (
          <MovableText key={t.id} text={t} onChange={handleUpdateText} onFocus={() => handleTextFocus(t.id)} />
        ))}
      </View>
      {overlaysShown && <View style={{
        width: '100%',
        // position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: bottom,
        height: BOTTOM_CONTAINER_HEIGHT + bottom,
        backgroundColor: colors.surface1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        zIndex: 2
      }}>
        <UndoButton hasBackAction={hasBackAction} onPress={handleUndo} />
        <TextButton onPress={handleTextButtonPress} />
        <ImagePickerButton onPress={handleImagePickerButtonPress} />
        <StickerButton onPress={handleStickerButtonPress} />
        <BackgroundButton onPress={handleBackgroundButtonPress} />
        <PencilButton />
      </View>
      }
    </Container>
  );
};




const TextAlignContainer = ({ align, setAlign }: { align: 'left' | 'center' | 'right', setAlign: (align: 'left' | 'center' | 'right') => void; }) => {
  const colors = useThemeColor();
  if (align === 'left') {
    return (
      <Pressable
        onPress={() => setAlign('center')}
        style={{
          width: 32, height: 32,
          borderRadius: 4,
          alignItems: 'center', justifyContent: 'center'
        }}>
        <AlignLeftIcon size={24} color={colors.primaryText} />
      </Pressable>
    );
  }
  if (align === 'center') {
    return (
      <Pressable
        onPress={() => setAlign('right')}
        style={{
          width: 32, height: 32,
          borderRadius: 4,
          alignItems: 'center', justifyContent: 'center'
        }}>
        <AlignCenterIcon size={24} color={colors.primaryText} />
      </Pressable>
    );
  }
  if (align === 'right') {
    return (
      <Pressable
        onPress={() => setAlign('left')}
        style={{
          width: 32, height: 32,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <AlignRightIcon size={24} color={colors.primaryText} />
      </Pressable>
    );
  }
};


const FONTS = [
  'SingleDay',
  'System',
];

type FontStyleContainerProps = {
  font: string,
  setFont: (font: string) => void;
};

const FontStyleContainer = (props: FontStyleContainerProps) => {
  const { font, setFont } = props;
  const colors = useThemeColor();
  return (
    <ScrollView
      horizontal
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{
        gap: 8,
        width: 130,
        height: 40, alignItems: 'center'
      }}
    >
      {font === 'System' ?
        <Pressable
          onPress={() => setFont('SingleDay')}
          style={{
            width: 50,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            borderCurve: 'continuous',
            backgroundColor: colors.surface3
          }}>
          <Text type='p' style={{ fontFamily: 'System' }} color={colors.primaryText}>Abc</Text>
        </Pressable>
        :
        font === 'SingleDay' ?
          <Pressable
            onPress={() => setFont('System')}
            style={{
              height: 28,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              borderCurve: 'continuous',
              backgroundColor: colors.surface3
            }}>
            <Text type='p' style={{ fontFamily: 'SingleDay' }} color={colors.primaryText}>Abc</Text>
          </Pressable>
          :
          null
      }
      {/* {FONTS.map((f, i) => (
        <Pressable
          key={f}
          onPress={() => setFont(f)}
          style={{
            paddingHorizontal: 10,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: f === font ? colors.primary : colors.surface3,
            backgroundColor: f === font ? colors.secondary : colors.surface3
          }}>
          <Text type='p' style={{ fontFamily: f }} color={f === font ? colors.primary : colors.primaryText}>Abc</Text>
        </Pressable>
      ))} */}
    </ScrollView>
  );
};

const MovableText = ({ text, onChange, onFocus }: {
  text: PageTextType;
  onChange: (t: PageTextType) => void;
  onFocus: () => void;
}) => {
  const start = useSharedValue({ x: text.x, y: text.y });
  const offset = useSharedValue({ x: text.x, y: text.y });
  const textScale = useSharedValue(text.scale);
  const lastScale = useSharedValue(text.scale);
  const fontSize = useSharedValue(text.size);

  const pinchGesture = Gesture.Pinch()
    .onStart((ctx) => {
      lastScale.value = textScale.value;
    })
    .onUpdate((e) => {
      const { scale, focalX, focalY, } = e;
      // fontSize.value = scale * text.size;
      textScale.value = scale * lastScale.value;
    })
    .onEnd(() => {
      handleSetFontSize(fontSize.value);
    })
    .runOnJS(true);

  const dragGesture = Gesture.Pan()
    .onStart((_e) => {
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      handleSetOffsets(offset.value.x, offset.value.y);
    })
    .runOnJS(true);

  const tapGesture = Gesture.Tap().onEnd(() => {
    onFocus();
  }).runOnJS(true);


  const composed = Gesture.Race(tapGesture, dragGesture, pinchGesture);

  const handleSetOffsets = (x: number, y: number) => {
    const t: PageTextType = {
      ...text,
      x,
      y,
    };
    onChange(t);
  };

  const handleSetFontSize = (size: number) => {
    const t: PageTextType = {
      ...text,
      scale: textScale.value
    };
    onChange(t);
  };

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: textScale.value }
      ],
      position: 'absolute',
      zIndex: text.z,
      textAlign: 'center',
      fontSize: text.size,
      fontFamily: text.font,
      color: text.color,
    };
  });

  return (
    <GestureDetector gesture={composed}>
      {/* <Animated.View style={animStyle}> */}
      <Animated.Text
        style={animStyle}
      >{text.body}</Animated.Text>
      {/* </Animated.View> */}
    </GestureDetector>
  );
};

type PencilButtonProps = {
  onPress?: () => void;
};

const PencilButton = (props: PencilButtonProps) => {
  const { onPress } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
      <BrushIcon size={24} color={colors.primaryText} />
    </Pressable>
  );
};

type BackgroundButtonProps = {
  onPress: () => void;
};
const BackgroundButton = (props: BackgroundButtonProps) => {
  const { onPress } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
      <BackgroundIcon size={24} color={colors.primaryText} />
    </Pressable>
  );
};

type StickerButtonProps = {
  onPress: () => void;
};

const StickerButton = (props: StickerButtonProps) => {
  const { onPress } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
      <StickerIcon size={24} color={colors.primaryText} />
    </Pressable>
  );
};

type ImagePickerButtonProps = {
  onPress: () => void;
};

const ImagePickerButton = (props: ImagePickerButtonProps) => {
  const { onPress } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
      {/* <Ionicons name="images-outline" size={24} color={colors.primaryText} /> */}
      <ImageIcon size={24} color={colors.primaryText} />
    </Pressable>
  );
};

type TextButtonProps = {
  onPress: () => void;
};

const TextButton = (props: TextButtonProps) => {
  const { onPress } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
      {/* <Ionicons name='text' size={24} color={colors.primaryText} /> */}
      <TextIcon size={24} color={colors.primaryText} />
    </Pressable>
  );
};

type UndoProps = {
  onPress?: () => void;
  hasBackAction: boolean;
};

const UndoButton = (props: UndoProps) => {
  const { onPress, hasBackAction } = props;
  const colors = useThemeColor();
  return (
    <Pressable style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} disabled={!hasBackAction} onPress={onPress}>
      <UndoIcon size={24} color={hasBackAction ? colors.primaryText : colors.secondaryText} />
    </Pressable>
  );
};

export default NewPage;

const styles = StyleSheet.create({});