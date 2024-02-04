import { ScreenProps, User } from '../../types';
import { Container } from '../../Theme/Themed';

const ProfileSetupScreen = ({ navigation, route }: ScreenProps<'ProfileSetup'>) => {
  const handleNext = async () => {
    //create auth user. firebase listener in AuthProvider will automatically
    //navigate to the correct screen based on the user's state
  };

  return (
    <Container showInsetTop showInsetBottom>
    </Container>
  );
};

export default ProfileSetupScreen;