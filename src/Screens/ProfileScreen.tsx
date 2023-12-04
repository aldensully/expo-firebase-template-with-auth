import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Container, useThemeColor } from '../Theme/Themed';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import defaultStore from '../Stores/defaultStore';
import { fetchPollsByUser } from '../Utils/utilFns';
import { Poll, ScreenProps, TabScreenProps } from '../types';
import Header from '../Components/Header';
import { PollCard } from './FeedScreen';
import CloseButton from '../Components/CloseButton';

const ProfileScreen = ({ navigation }: TabScreenProps<'Profile'>) => {
  const user = defaultStore(state => state.user);
  if (!user) return null;
  const { data, isLoading } = useQuery({ queryKey: ['polls', user.id], queryFn: () => fetchPollsByUser(user.id) });
  const [pollOpen, setPollOpen] = useState<Poll | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const colors = useThemeColor();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['polls', user.id] });
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Container>
      <Modal
        animationType='slide'
        presentationStyle='pageSheet'
        visible={pollOpen !== null}
        onRequestClose={() => setPollOpen(null)}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            <CloseButton onPress={() => setPollOpen(null)} />
          </View>
          {pollOpen && <PollCard item={pollOpen} />}
        </View>

      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingBottom: 120,
          paddingTop: 16
        }}>
        {data?.map(poll => {
          const totalVotes = poll.votes?.reduce((acc, val) => acc += val);
          return (
            <Pressable
              onPress={() => setPollOpen(poll)}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 16,
                gap: 8,
                borderCurve: 'continuous',
                backgroundColor: poll.color ? poll.color + 'aa' : colors.surface2
              }}
              key={poll.id}>
              <Text type='h3'>{poll.question}</Text>
              <Text type='p'>{totalVotes}{totalVotes === 1 ? ' vote' : ' votes'}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});