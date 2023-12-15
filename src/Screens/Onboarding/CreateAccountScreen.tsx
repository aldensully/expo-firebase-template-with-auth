import { Alert, Dimensions, Image, KeyboardAvoidingView, Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlipType, manipulateAsync } from 'expo-image-manipulator';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { ScreenProps, User } from '../../types';
import { Button, Container, Text, useThemeColor } from '../../Theme/Themed';
import defaultStore from '../../Stores/defaultStore';
import { createRecord, uploadMedia } from '../../Utils/utilFns';
import CloseButton from '../../Components/CloseButton';
import CheckIcon from '../../../assets/icons/CheckIcon';
import * as MediaLibrary from 'expo-media-library';
import PlusIcon from '../../../assets/icons/PlusIcon';

const CreateAccountScreen = ({ navigation, route }: ScreenProps<'CreateAccount'>) => {
  const colors = useThemeColor();
  const setUser = defaultStore(state => state.setUser);
  const cameraRef = useRef<Camera>(null);
  const [username, setUsername] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [firstImage, setFirstImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!cameraOpen || !cameraPermission || !mediaPermission) return;
    if (!cameraPermission?.granted) {
      requestCameraPermission()
        .then(() => {
          setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        })
        .catch(e => {
          Alert.alert('Please allow access to your camera in your settings.');
        });
    }
    if (!mediaPermission?.granted) {
      MediaLibrary.requestPermissionsAsync().then(() => {
        MediaLibrary.getAssetsAsync({ first: 1, sortBy: [MediaLibrary.SortBy.creationTime] }).then((res) => {
          if (res.assets.length > 0) {
            setFirstImage(res.assets[0].uri);
          }
        });
      }).catch(e => {
        console.log(e);
      });
    }
  }, [cameraOpen]);


  const handleNext = async () => {
    if (loading) return;
    if (username.length < 3) {
      Alert.alert('Please enter a username');
      return;
    }
    setLoading(true);
    const uid = auth.currentUser?.uid;
    if (!uid) {
      //there should be a uid at this point, but just in case
      console.log("NO UID FOUND, THIS IS BAD!");
      Alert.alert('Something went wrong, please contact support: aw.sullivan17@gmail.com');
      return;
    }

    const input: User = {
      id: uid,
      username: username,
      creation_date: new Date().toISOString().split('T')[0]
    };
    const res = await createRecord('users', uid, input);
    if (!res) {
      Alert.alert('Something went wrong, please contact support: aw.sullivan17@gmail.com');
      setLoading(true);
      return;
    }
    if (image) {
      const res = await uploadMedia(uid, image, { width: 120, height: 120 });
      if (!res) {
        Alert.alert('Something went wrong, please contact support');
      }
    }

    setUser(input);
    setLoading(true);
  };


  const openImage = async () => {
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
      setImage(result.assets[0].uri);
    } catch (e) {
    }
  };

  const { width, height } = Dimensions.get('window');

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const photo = await cameraRef.current.takePictureAsync();
    const manipResult = await manipulateAsync(
      photo.uri,
      [{ flip: FlipType.Horizontal }]
    );
    setImage(manipResult.uri);
  };


  const { bottom } = useSafeAreaInsets();


  return (
    <Container showInsetTop showInsetBottom>
      <Modal style={{
        flex: 1,
      }}
        presentationStyle='pageSheet'
        animationType='slide'
        visible={cameraOpen}
        onRequestClose={() => setCameraOpen(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#000', paddingBottom: bottom + 32 }}>
          <View style={{ paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', minHeight: 70 }}>
            <CloseButton color='#fff' onPress={() => setCameraOpen(false)} />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image ?
              <Image
                source={{ uri: image }}
                style={{ width, height: width, borderRadius: width }}
              />
              : <View style={{ borderRadius: width, overflow: 'hidden' }}>
                <Camera
                  ref={cameraRef}
                  style={{
                    height: width, width: width,
                    alignItems: 'center',
                    padding: 16,
                    justifyContent: 'center',
                    zIndex: 10000
                  }}
                  type={CameraType.front}
                >
                  {/* <View style={{ width: width - 20, height: width - 20, borderRadius: width, borderWidth: 3, borderColor: 'white' }} /> */}
                </Camera>
              </View>
            }
          </View>
          <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
            {image ?
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
                <Pressable
                  onPress={() => setImage(undefined)}
                  style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 70, backgroundColor: colors.danger }}>
                  <CloseIcon size={36} stroke={colors.primaryButtonText} />
                </Pressable>
                <Pressable
                  onPress={() => setCameraOpen(false)}
                  style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 70, backgroundColor: colors.primary }}>
                  <CheckIcon size={36} color={colors.primaryButtonText} />
                </Pressable>
              </View>
              : <Pressable
                onPress={takePhoto}
                style={{ width: 80, height: 80, borderRadius: 80, borderWidth: 5, borderColor: 'white' }}
              />
            }
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: 64, width: '100%' }}
        behavior='padding'
        keyboardVerticalOffset={200}
      >
        <View style={{ alignItems: 'center', paddingHorizontal: 30, borderRadius: 12, flex: 1 }}>
          <Text type='h1' style={{ textAlign: 'center', fontSize: 34 }}>Your profile</Text>
          <Pressable
            onPress={() => setCameraOpen(true)}
            style={{ marginTop: 64 }}
          >
            {image ? <Image
              source={{ uri: image }}
              style={{
                width: 180,
                height: 180,
                borderRadius: width / 6
              }}
            />
              : <View style={{
                width: 140,
                height: 140,
                borderRadius: width / 6,
                backgroundColor: colors.surface2,
                borderCurve: 'continuous',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name='image' size={60} color={colors.secondaryText} />
                {/* <Text color={colors.secondaryText} type='h3'>Add photo</Text> */}
              </View>
            }
          </Pressable>
          <TextInput
            value={username}
            onChangeText={setUsername}
            maxLength={20}
            style={{
              borderBottomColor: colors.secondaryText,
              backgroundColor: colors.surface1,
              fontSize: 28,
              fontFamily: 'SingleDay',
              color: colors.primaryText,
              minWidth: 200,
              marginTop: 32,
              textAlign: 'center',
            }}
            placeholder='username'
            placeholderTextColor={colors.secondaryText}
            blurOnSubmit
            returnKeyLabel='done'
            returnKeyType='done'
          />
        </View>
      </KeyboardAvoidingView>
      <Button
        title="Next"
        type='primary'
        onPress={handleNext}
        disabled={username.length < 3}
        loading={loading}
        style={{ width: 200, marginBottom: 32 }}
      />
    </Container>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({});