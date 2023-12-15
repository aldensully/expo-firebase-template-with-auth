import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Diary, Page, ScreenProps, UseNavigationType } from '../types';
import { Container, Text, useThemeColor } from '../Theme/Themed';
import Header from '../Components/Header';
import ChevronDownIcon from '../../assets/icons/ChevronDownIcon';
import MenuButton from '../Components/MenuButton';
import { useQuery } from '@tanstack/react-query';
import defaultStore from '../Stores/defaultStore';
import { apiGetDiary, apiListDiaries } from '../Utils/utilFns';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const temp = [
  { id: 1, title: 'Page 1', content: 'This is page 1' },
  { id: 2, title: 'Page 2', content: 'This is page 2' },
  { id: 3, title: 'Page 3', content: 'This is page 3' },
  { id: 4, title: 'Page 4', content: 'This is page 4' },
  { id: 5, title: 'Page 5', content: 'This is page 5' },
];

const Home = ({ navigation, route }: ScreenProps<'Home'>) => {
  const user = defaultStore(state => state.user);
  if (!user) return null;
  const activeDiaryId = defaultStore(state => state.activeDiaryId);
  const { data, isLoading } = useQuery({ queryKey: ['diary', activeDiaryId], queryFn: () => apiGetDiary(activeDiaryId) });
  const { width, height } = Dimensions.get('window');
  const cellWidth = (width - 40) / 2;
  const colors = useThemeColor();

  return (
    <Container>
      <Header
        headerLeft={<HeaderDropDown />}
        headerRight={<MenuButton />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 100
        }}
      >
        <View style={{
          paddingHorizontal: 13,
          columnGap: 5,
          rowGap: 5,
          flexDirection: 'row',
          width: '100%', flexWrap: 'wrap'
        }}>
          {temp?.map(t => (
            <Pressable
              style={{
                width: cellWidth,
                height: cellWidth * (9 / 6),
                margin: 2,
                backgroundColor: colors.surface2,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              key={t.id}
            >
              <Text type='h3'>{t.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <NewPageButton />
    </Container>
  );
};


const NewPageButton = () => {
  const navigation = useNavigation<UseNavigationType>();
  const colors = useThemeColor();
  const { bottom } = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => navigation.navigate('NewPage')}
      style={{
        position: 'absolute',
        right: 30,
        bottom: bottom + 32,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface2,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}>
      <Feather name='plus' size={32} color={colors.primary} />
    </Pressable>
  );
};

const HeaderDropDown = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const colors = useThemeColor();

  const handlePress = () => {

  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        gap: 8
      }}
    >
      <Text type='h1'>Diary 1</Text>
      <Ionicons name="chevron-down" size={24} color="black" />
    </Pressable>
  );
};













export default Home;

const styles = StyleSheet.create({});