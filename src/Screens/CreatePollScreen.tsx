import { ActionSheetIOS, ActivityIndicator, Alert, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { ForwardedRef, RefObject, createRef, forwardRef, useEffect, useState } from 'react';
import { Text, Button, Container, useThemeColor } from '../Theme/Themed';
import CloseButton from '../Components/CloseButton';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import { createPoll, createRecord, generateUUID } from '../Utils/utilFns';
import { Poll, ScreenProps } from '../types';
import defaultStore from '../Stores/defaultStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mainColors = ['#00A1FA', '#B03FF5', '#FF159C', '#FFA02A', '#7FD533', '#E9CC34'];


type Options = {
  [key: number]: OptionItem;
};

type OptionItem = {
  id: number;
  type: 'text' | 'image';
  text: string;
  image: string | null;
  music: string | null;
  ref: RefObject<TextInput>;
};

const CreatePollScreen = ({ navigation, route }: ScreenProps<'CreatePoll'>) => {
  const colors = useThemeColor();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mainColor, setMainColor] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const user = defaultStore(state => state.user);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const { width, height } = Dimensions.get('window');
  const textInputWidth = width - 40 - 72;

  const addOption = () => {
    if (options.length >= 4) {
      Alert.alert('You can only add up to 4 options.');
      return;
    }
    const type = 'text';
    const newOption: OptionItem = {
      id: options.length + 1,
      text: '',
      type,
      image: null,
      music: null,
      ref: createRef<TextInput>()
    };
    setOptions([...options, newOption]);
    setTimeout(() => {
      if (type === 'text') {
        newOption.ref.current?.focus();
      } else if (type === 'image') {
        openImagePicker(newOption.id);
      } else {
      }
    }, 300);
    // ActionSheetIOS.showActionSheetWithOptions(
    //   {
    //     options: ['Text', 'Image', 'Cancel'],
    //     cancelButtonIndex: 2
    //   },
    //   buttonIndex => {
    //     if (buttonIndex === 2) return;
    //     const type = buttonIndex === 0 ? 'text' : 'image';
    //     const newOption: OptionItem = {
    //       id: options.length + 1,
    //       text: '',
    //       type,
    //       image: null,
    //       music: null,
    //       ref: createRef<TextInput>()
    //     };
    //     setOptions([...options, newOption]);
    //     setTimeout(() => {
    //       if (type === 'text') {
    //         newOption.ref.current?.focus();
    //       } else if (type === 'image') {
    //         openImagePicker(newOption.id);
    //       } else {
    //       }
    //     }, 300);
    //   }
    // );
  };

  const removeOption = (id: number) => {
    const newOptions = options.filter(option => option.id !== id);
    setOptions(newOptions);
  };

  const updateOptionValue = (text: string, id: number) => {
    const newOptions = options.map(option => {
      if (option.id === id) {
        return { ...option, text: text };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const openImagePicker = async (id?: number) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Please allow access to your photos in your settings.");
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        aspect: [4, 3]
      });
      if (result.canceled) {
        return;
      }
      if (!id) {
        setImage(result.assets[0].uri);
      } else {
        setOptions(n => {
          return n.map(option => {
            if (option.id === id) {
              return { ...option, image: result.assets[0].uri };
            }
            return option;
          });
        });
      }
    } catch (e) {
      Alert.alert("Something went wrong, please try again.");
    }
  };


  const createPollMutation = useMutation({
    mutationFn: createPoll,
    onMutate: async (newPoll: Poll) => {
      const previousPolls = queryClient.getQueryData(['polls']);
      queryClient.setQueryData(['poll', newPoll.id], newPoll);
      queryClient.setQueryData(['polls'], (oldPolls: Poll[] | undefined) => {
        if (oldPolls) return [newPoll, ...oldPolls];
        return [newPoll];
      });

      return { previousPolls };
    },
    onSettled(data, error, variables, context) {
      setLoading(false);
      if (!data || error) {
        queryClient.setQueryData(['polls'], context?.previousPolls);
        Alert.alert('Something went wrong, please try again.');
      } else {
        navigation.goBack();
      }
    },
  });

  const handleSave = async () => {
    if (loading || !user) return;
    if (question.length < 1) {
      Alert.alert('Please enter a question.');
      return;
    }
    if (options.length < 2) {
      Alert.alert('Add at least two options.');
      return;
    }
    const emptyOption = options.find(option => {
      if (option.type === 'text') return option.text.length < 1;
      if (option.type === 'image') return option.image === undefined;
    });
    if (emptyOption) {
      Alert.alert('Please fill out all options.');
      return;
    }
    setLoading(true);

    // const poll: Poll = {
    //   id: 'temporaryWillBeReplaced',
    //   question,
    //   options: options.map(option => ({ id: 'tempWillBeReplaced', text: option.text, image: option.image, type: option.type })),
    //   user_id: user.id,
    //   creation_date: new Date().getTime(),
    //   color: mainColor,
    //   votes: []
    // };
    const poll: Poll = {
      id: generateUUID(),
      user_id: user.id,
      question: question,
      options: options.map((o, index) => {
        // const imgUriObj = imgUris.find(uriObj => uriObj && uriObj.index === index);
        return {
          id: generateUUID(),
          text: o.text,
          image: null,
          type: o.type
        };
      }),
      color: mainColor,
      creation_date: new Date().getTime(),
      votes: options.map(() => 0)
    };
    createPollMutation.mutate(poll);
  };

  return (
    <Container>
      <Header
        headerLeft={<BackButton navigate />}
        headerTitle={<Text type='h3' color={colors.primaryText}>Ask</Text>}
        headerRight={
          <Pressable
            onPress={handleSave}
            style={{ right: -4, paddingHorizontal: 10, paddingVertical: 6 }}>
            {loading ? <ActivityIndicator color={'#1e88e5'} /> : <Text type='h3' color={'#1E88E5'}>Create</Text>}
          </Pressable>
        }
        style={{
          backgroundColor: mainColor ? mainColor + '26' : colors.surface1,
          paddingHorizontal: 16
        }}
      />
      <Modal
        animationType='fade'
        presentationStyle='fullScreen'
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      >
        <Pressable
          onPress={() => setShowImage(false)}
          style={{ flex: 1, backgroundColor: 'black' }}>
          {image && <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: '100%'
            }}
            resizeMode='contain'
          />
          }
        </Pressable>
      </Modal>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: mainColor ? mainColor + '26' : colors.surface1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
            paddingHorizontal: 20,
            paddingTop: 16
          }}
          bounces={false}
          keyboardShouldPersistTaps='handled'
        >
          <Text type='sm' style={{ fontSize: 15, marginLeft: 10, marginBottom: 8 }} color={colors.secondaryText}>QUESTION</Text>
          <View
            style={{
              backgroundColor: mainColor ? mainColor + '33' : colors.surface2,
              borderRadius: 12,
              borderCurve: 'continuous',
              minHeight: 55,
              flexDirection: 'row',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}
          >
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Ask a question"
              maxLength={100}
              blurOnSubmit
              multiline
              scrollEnabled={false}
              style={{
                fontFamily: 'Nunito-Medium',
                fontSize: 18,
                lineHeight: 23,
                marginBottom: 4,
                // width: textInputWidth,
                width: width - 72,
                color: colors.primaryText
              }}
              returnKeyType='done'
              returnKeyLabel='done'
              placeholderTextColor={colors.secondaryText}
            />
            {/* {image ? <Pressable
              onPress={() => setShowImage(true)}
              style={{
                width: 45,
                height: 45,
                backgroundColor: mainColor ? mainColor + '33' : colors.surface3,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6
              }}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 6
                }}
                resizeMode='cover'
              />
            </Pressable>
              :
              <Pressable onPress={() => openImagePicker()} style={{
                width: 40, height: 40,
                alignItems: 'center', justifyContent: 'center',
                position: 'absolute',
                right: 8,
                top: 8
              }}>
                <Ionicons name='image-outline' size={24} color={mainColor ? mainColor : colors.secondaryText} />
              </Pressable>
            } */}
          </View>
          <Text type='sm' style={{ fontSize: 15, marginLeft: 10, marginTop: 32 }} color={colors.secondaryText}>OPTIONS</Text>
          <View style={{ marginTop: 8, gap: 12 }}>
            {options.map(option => (
              <Option
                option={option}
                key={option.id}
                ref={option.ref}
                onChange={updateOptionValue}
                openImagePicker={openImagePicker}
                removeOption={removeOption}
                mainColor={mainColor}
              />
            ))}
            {options.length < 4 && <Pressable
              style={{
                backgroundColor: mainColor ? '#FFF' : "#1E88E522",
                borderRadius: 12,
                borderCurve: 'continuous',
                padding: 12,
                height: 55,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center', gap: 4
              }} onPress={addOption}>
              <Ionicons name='add-circle' size={24} color={'#1E88E5'} />
              <Text type='p' style={{ fontWeight: '600', fontSize: 17 }} color={'#1E88E5'}>Add Option</Text>
            </Pressable>
            }
          </View>
          {/* <Text type='sm' style={{ fontSize: 15, marginLeft: 10, marginTop: 32 }} color={colors.secondaryText}>COLOR</Text>
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            {mainColors.map(color => (
              <Pressable
                onPress={() => setMainColor(color)}
                style={{
                  width: 50, height: 50,
                  borderWidth: 2,
                  borderColor: color === mainColor ? '#000' : color,
                  borderRadius: 50, backgroundColor: color
                }} />
            ))}
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

type Props = {
  option: OptionItem;
  onChange: (text: string, id: number) => void;
  removeOption: (id: number) => void;
  openImagePicker: (id: number) => void;
  mainColor: string | null;
};

const Option = forwardRef((props: Props, ref: ForwardedRef<TextInput>) => {
  const { option, onChange, mainColor, openImagePicker, removeOption } = props;
  const colors = useThemeColor();
  const { width, height } = Dimensions.get('window');
  const textInputWidth = width - 40 - 72;
  const imageInputWidth = width - 40 - 72 - 50;
  const [showImage, setShowImage] = useState(false);

  if (option.type === 'image') return (
    <>
      <Modal
        animationType='fade'
        presentationStyle='fullScreen'
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      >
        <Pressable
          onPress={() => setShowImage(false)}
          style={{ flex: 1, backgroundColor: 'black' }}>
          {option.image && <Image
            source={{ uri: option.image }}
            style={{
              width: '100%',
              height: '100%'
            }}
            resizeMode='contain'
          />
          }
        </Pressable>
      </Modal>
      <View style={{
        backgroundColor: mainColor ? mainColor + '2e' : colors.surface2,
        minHeight: 50,
        borderCurve: 'continuous',
        borderRadius: 12,
        paddingLeft: 16,
        paddingVertical: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Pressable
          onPress={() => {
            if (option.image) {
              setShowImage(true);
            } else {
              openImagePicker(option.id);
            }
          }}
          style={{
            width: 45,
            height: 45,
            backgroundColor: mainColor ? mainColor + '33' : colors.surface3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6
          }}>
          {option.image ? <Image
            source={{ uri: option.image }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 6
            }}
            resizeMode='cover'
          />
            : <Ionicons name='image-outline' size={24} color={mainColor ? mainColor : colors.secondaryText} />
          }
        </Pressable>
        <TextInput
          ref={ref}
          placeholder={'Add a caption...'}
          maxLength={50}
          multiline
          numberOfLines={2}
          style={{
            fontFamily: 'Nunito-Medium',
            fontSize: 17,
            marginLeft: 4,
            textAlignVertical: 'top',
            marginBottom: 4,
            width: imageInputWidth,
            color: colors.primaryText
          }}
          placeholderTextColor={colors.secondaryText}
          key={option.id}
          value={option.text}
          onChangeText={(text) => onChange(text, option.id)}
          returnKeyLabel='done'
          blurOnSubmit
          returnKeyType='done'
        />
        <Pressable style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          marginRight: 4,
          justifyContent: 'center'
        }}
          onPress={() => removeOption(option.id)}
        >
          <Ionicons name='remove-circle' size={24} color={colors.danger} />
        </Pressable>
      </View>
    </>
  );
  return (
    <View style={{
      backgroundColor: mainColor ? mainColor + '2e' : colors.surface2,
      minHeight: 50,
      borderCurve: 'continuous',
      borderRadius: 12,
      paddingLeft: 16,
      paddingVertical: 8,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <TextInput
        ref={ref}
        placeholder={`Option ${option.id}`}
        maxLength={60}
        multiline
        style={{
          fontFamily: 'Nunito-Medium',
          fontSize: 17,
          textAlignVertical: 'top',
          marginBottom: 4,
          width: textInputWidth,
          color: colors.primaryText
        }}
        placeholderTextColor={colors.secondaryText}
        key={option.id}
        value={option.text}
        onChangeText={(text) => onChange(text, option.id)}
        returnKeyLabel='done'
        blurOnSubmit
        returnKeyType='done'
      />
      <Pressable style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        marginRight: 4,
        justifyContent: 'center'
      }}
        onPress={() => removeOption(option.id)}
      >
        <Ionicons name='remove-circle' size={24} color={colors.danger} />
      </Pressable>
    </View>
  );
});

export default CreatePollScreen;

const styles = StyleSheet.create({});