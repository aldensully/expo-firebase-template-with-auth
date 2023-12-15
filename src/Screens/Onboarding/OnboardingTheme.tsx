import { Alert, Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Container, useThemeColor } from '../../Theme/Themed';
import { Diary, ScreenProps, User } from '../../types';
import { Text } from '../../Theme/Themed';
import { generateUUID } from '../../Utils/utilFns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultStore from '../../Stores/defaultStore';

const diaryColors = ["#B9D87C", "#EAC184"];

const OnboardingTheme = ({ navigation, route }: ScreenProps<'OnboardingTheme'>) => {
  const colors = useThemeColor();
  const [diaryColor, setDiaryColor] = useState(colors.primary);
  const [name, setName] = useState('My Diary');
  const { width, height } = Dimensions.get('window');
  const diaryWidth = width * 0.7;
  const diaryHeight = diaryWidth * (9 / 6);
  const [loading, setLoading] = useState(false);
  const setUser = defaultStore(state => state.setUser);


  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    //set local diary
    const diary: Diary = {
      id: generateUUID(),
      title: name,
      color: diaryColor,
      user_id: '',
      pages: [],
      creation_date: new Date().toISOString().split('T')[0]
    };
    const user: User = {
      id: generateUUID(),
      username: 'user-' + generateUUID().slice(0, 8),
      creation_date: new Date().toISOString().split('T')[0]
    };
    try {
      const res = await Promise.allSettled([
        AsyncStorage.setItem('diaries', JSON.stringify([diary])),
        AsyncStorage.setItem('user', JSON.stringify(user))
      ]);
      res.forEach(r => {
        if (r.status === 'rejected') {
          throw new Error(r.reason);
        }
      });
      setUser(user);
      setLoading(false);
      navigation.navigate('Main');
    } catch (e) {
      console.log(e);
      setLoading(false);
      Alert.alert('Error', 'Something went wrong, please try again');
    }
  };


  return (
    <Container showInsetBottom showInsetTop>
      <View style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 32,
        width: "100%",
        paddingHorizontal: '10%'
      }}>
        <Text type='h1'>Customize your diary</Text>
        <View style={{
          marginTop: 32,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 4,
          borderTopLeftRadius: 4,
          backgroundColor: diaryColor + 'aa',
          alignItems: 'center',
          width: diaryWidth,
          height: diaryHeight,
        }}>
          <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 20, backgroundColor: diaryColor + 'aa' }} />
          <View style={{
            marginTop: '20%',
            width: diaryWidth * 0.7,
            height: diaryWidth * 0.5,
            borderRadius: 2,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: diaryColor + 'aa',
          }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder='Diary Name'
              maxLength={20}
              multiline
              returnKeyType='done'
              blurOnSubmit
              style={{
                fontSize: 32,
                fontFamily: 'SingleDay',
                color: '#000',
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 32 }}>
          {diaryColors.map((c, i) => (
            <Pressable
              key={i}
              onPress={() => setDiaryColor(c)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: c,
                borderWidth: 2,
                borderColor: diaryColor === c ? colors.primaryText : 'transparent'
              }}
            />
          ))}
        </View>
        <Button
          title='Done'
          type='primary'
          style={{ marginTop: 'auto', marginBottom: 32 }}
          onPress={handleDone}
        />
      </View>
    </Container>
  );
};

export default OnboardingTheme;

const styles = StyleSheet.create({});