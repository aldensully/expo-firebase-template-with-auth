import { StyleSheet } from 'react-native';
import { TabsScreenProps } from '../types';
import { Container, Text } from '../Theme/Themed';

const Home = ({ navigation, route }: TabsScreenProps<'Home'>) => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});