import { ActivityIndicator, Alert, Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createRecord, fetchDocument, fetchDocuments, fetchMyVote, fetchPolls, fetchQuestions, generateUUID, updateRecord } from '../Utils/utilFns';
import { Container, Text, useThemeColor } from '../Theme/Themed';
import { Option, Poll, Question, User, Vote } from '../types';
import Thumbnail from '../Components/Thumbnail';
import defaultStore from '../Stores/defaultStore';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type OptionButtonProps = {
  option: Option;
  poll: Poll;
  onPress: () => void;
  selected: boolean;
  roundOver: boolean;
  index: number;
};

export const OptionButton = (props: OptionButtonProps) => {
  const { option, selected, roundOver, poll, onPress, index } = props;
  const colors = useThemeColor();
  const { width, height } = Dimensions.get('window');
  const cellWidth = width - 40;
  const color = poll.color ? poll.color : '#3CDAFD';
  const backgroundColor = poll.color ? poll.color + '26' : '#3CDAFD26';
  const cardColor = poll.color ? poll.color + '2B' : '#3CDAFD2B';
  const secondaryPercentageColor = poll.color ? poll.color + '40' : '#3CDAFD40';
  const primaryPercentageColor = poll.color ? poll.color : '#3CDAFD88';
  const borderColor = poll.color ? poll.color + '4D' : '#3CDAFD2b';
  const barWidth = useSharedValue(0);

  let percentageNum = 0;
  let percentageString = '0%';
  let totalVotes = 0;
  poll.votes?.forEach(voteCount => {
    totalVotes += voteCount;
  });
  if (totalVotes > 0 && poll.votes[index] > 0) {
    percentageNum = Math.round(poll.votes[index] / totalVotes);
    percentageString = percentageNum * 100 + '%';
  };
  const topAnswerIndex = poll.votes.reduce((highestIndex, currentValue, currentIndex, arr) => {
    return currentValue > arr[highestIndex] ? currentIndex : highestIndex;
  }, 0);

  useEffect(() => {
    if (!roundOver) return;
    barWidth.value = withTiming(percentageNum * cellWidth, { duration: 600 });
  }, [roundOver, percentageNum]);

  const barStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      width: barWidth.value,
      top: 0,
      bottom: 0,
      zIndex: 1,
      borderRadius: 20,
      borderCurve: 'continuous',
      borderWidth: 3,
      borderColor: index === topAnswerIndex ? borderColor : 'transparent',
      backgroundColor: index === topAnswerIndex ? primaryPercentageColor : secondaryPercentageColor,
    };
  }, [percentageNum, totalVotes, selected]);


  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        minHeight: 80,
        backgroundColor: cardColor,
        paddingVertical: 16,
        borderRadius: 20,
        borderCurve: 'continuous',
      }}>
      {roundOver && percentageNum * cellWidth > 0 && <Animated.View
        style={barStyle}
      />
      }
      <View
        style={{
          zIndex: 2,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: roundOver ? 'space-between' : 'center',
          flexDirection: 'row',
          flex: 1
        }}>
        {option.type === 'text' && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ maxWidth: cellWidth * 0.65 }} type='h3'>{option.text}</Text>
          {selected && <Ionicons name="checkmark-circle" size={20} color={colors.primaryText} />}
        </View>
        }
        {option.type === 'image' && option.image && <View style={{ flexDirection: 'row', height: 80, alignItems: 'center', gap: 6 }}>
          <Image
            source={{ uri: option.image }}
            style={{
              width: 80,
              minHeight: 90,
              borderRadius: 8
            }}
          />
          <Text style={{ maxWidth: cellWidth * 0.65 }} type='h3'>{option.text}</Text>
          {selected && <Ionicons name="checkmark-circle" size={20} color={colors.primaryText} />}
        </View>
        }
        {roundOver && <Text type='h3'>{topAnswerIndex === index && '🏆 '} {percentageString}</Text>}
      </View>
    </Pressable>
  );
};

export const PollCard = ({ item: passedPoll }: { item: Poll; }) => {
  const { width, height } = Dimensions.get('window');
  const user = defaultStore((state) => state.user);
  if (!user) return null;
  const { data: pollUser, isLoading } = useQuery({ queryKey: ['user', passedPoll.user_id], queryFn: () => fetchDocument<User>(`users/${passedPoll.user_id}`) });
  const { data: userVote, isFetching: isFetchingUserVote } = useQuery({ queryKey: ['myVote', passedPoll.id], queryFn: () => fetchMyVote(user?.id, passedPoll.id) });
  const { data: poll } = useQuery<Poll>({ queryKey: ['poll', passedPoll.id], staleTime: Infinity, refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const scrollFeed = defaultStore(state => state.scrollFeed);
  const colors = useThemeColor();
  const queryClient = useQueryClient();


  useEffect(() => {
    if (userVote) setSelectedOption(userVote.option_id);
  }, [userVote]);

  if (!poll) return null;

  let totalVotes = 0;
  poll.votes?.forEach(voteCount => {
    totalVotes += voteCount;
  });

  const handlePress = async (optionId: string, index: number) => {
    if (selectedOption) return;
    // setTimeout(() => {
    //   scrollFeed();
    // }, 1000);
    const vote: Vote = {
      id: generateUUID(),
      user_id: user.id,
      poll_id: passedPoll.id,
      option_id: optionId
    };
    setSelectedOption(optionId);
    const newVotes = [...poll.votes];
    newVotes[index] = newVotes[index] + 1;
    queryClient.setQueryData(['myVote', passedPoll.id], vote);
    queryClient.setQueryData(['poll', passedPoll.id], { ...poll, votes: newVotes });
    const Promises = [
      createRecord<Vote>('votes', vote.id, vote),
      updateRecord<Poll>('polls', poll.id, { votes: newVotes }),
    ];
    await Promise.allSettled(Promises);
  };

  // if (isLoading || !pollUser || isFetchingUserVote) return (
  if (!pollUser) return (
    <View style={{ width, paddingBottom: 140, height, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={colors.primaryText} size='large' />
    </View>
  );

  return (
    <View style={{
      width,
      height,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: '8%'
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Thumbnail id={pollUser.id} username={pollUser.username} size='sm' />
        <Text type='p'>{pollUser.username}</Text>
      </View>
      <Text style={{ marginTop: '15%' }} type='h1'>{poll.question}</Text>
      <View style={{ marginTop: 48, gap: 10, width: '100%' }}>
        {poll?.options?.map((option, index) => (
          <OptionButton
            key={option.id}
            option={option}
            onPress={() => handlePress(option.id, index)}
            selected={selectedOption === option.id}
            roundOver={selectedOption !== null}
            poll={poll}
            index={index}
          />
        ))}
      </View>
      <Text style={{ marginLeft: 'auto', marginRight: 8, marginTop: 24 }} type='sm'>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}</Text>
    </View>
  );
};

const BinaryCard = ({ item: passedQuestion }: { item: Question; }) => {
  return (
    null
  );
};

const FeedScreen = () => {
  const { data, isLoading } = useQuery({ queryKey: ['polls'], queryFn: fetchPolls });
  const { width, height } = Dimensions.get('window');
  const queryClient = useQueryClient();
  const scrollRef = useRef<FlatList>(null);
  const scrollFeed = defaultStore(state => state.feedScrollListener);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (scrollFeed === 0) return;
    scrollRef.current?.scrollToIndex({ index: scrollIndex + 1, animated: true });
  }, [scrollFeed]);


  useEffect(() => {
    if (!data) return;
    data.forEach(poll => {
      queryClient.setQueryData(['poll', poll.id], poll);
    });
  }, [data]);

  const handleSetScrollIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setScrollIndex(index);
  };


  const renderItem = ({ item }: { item: Poll; }) => {
    return <PollCard item={item} />;
  };


  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['polls'] });
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Container
      showInsetTop
    >
      <FlatList
        data={data}
        ref={scrollRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        // scrollEnabled={false}
        // horizontal
        snapToInterval={height}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        decelerationRate={'fast'}
        pagingEnabled
        onMomentumScrollEnd={handleSetScrollIndex}
        onScrollToIndexFailed={() => { }}
        style={{
          width,
          flex: 1
        }}
      />
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});