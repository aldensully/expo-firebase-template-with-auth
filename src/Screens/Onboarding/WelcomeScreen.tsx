import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { ScreenProps } from '../../types';
import { Container, Text } from '../../Theme/Themed';
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const WelcomeScreen = ({ navigation, route }: ScreenProps<'Welcome'>) => {
  const signIn = async () => {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { identityToken } = appleCredential;
      if (identityToken) {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        const credential = provider.credential({
          idToken: identityToken,
        });
        const user = await signInWithCredential(auth, credential);
        console.log("USER: ", user.user.uid);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container showInsetBottom>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ gap: 8, alignItems: 'center', marginTop: 200 }}>
          {/* <Image source={require('../../../assets/icon.png')} style={{ width: 160, height: 160 }} /> */}
          {/* <Text type='h1' style={{ fontSize: 32, fontFamily: 'System', fontWeight: '900', marginTop: -20 }}></Text> */}
        </View>
        {/* <Text style={{ textAlign: 'center', maxWidth: '85%', marginTop: 32 }} type='h2'>We believe in small steps and social support to help you accomplish your goals</Text> */}
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 16, marginTop: 120, width: '100%' }}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={50}
          style={{ width: '100%', height: 60 }}
          onPress={signIn}
        />
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});