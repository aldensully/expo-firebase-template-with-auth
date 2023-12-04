/* 
reuseable component for displaying user profile images or initials (if not picture)
*/
import { useQuery } from "@tanstack/react-query";
import { Image, ImageStyle, Platform, View } from "react-native";
import { Image as ExpoImage } from 'expo-image';
import { Text, useThemeColor } from "../Theme/Themed";
import { apiFetchStorageUrl } from "../Utils/utilFns";

const Sizes = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 90
};
const TextSizes = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 24,
  '2xl': 36
};

type Props = {
  id: string;
  username?: string;
  size?: keyof typeof Sizes;
  style?: ImageStyle;
};

const Thumbnail = (props: Props) => {
  const { id, username, style, size = 'md' } = props;
  const viewSize = Sizes[size];
  const colors = useThemeColor();
  const { data, isLoading } = useQuery({ queryKey: ['thumbnail', id], queryFn: () => apiFetchStorageUrl(id) });

  if (!data || isLoading) return (
    <View style={[{
      width: viewSize,
      height: viewSize,
      borderRadius: viewSize,
      backgroundColor: colors.surface3, alignItems: 'center', justifyContent: 'center'
    }, style]}>
      {username && <Text
        type='h3'
        style={{ fontFamily: 'Nunito-Black', fontSize: TextSizes[size] }}
        color={colors.secondaryText}>{username[0]}</Text>
      }
    </View>
  );
  return (
    Platform.OS === 'ios' ?
      <ExpoImage
        source={{ uri: data }}
        style={[{
          width: viewSize,
          height: viewSize,
          borderRadius: viewSize
        }, style]}
        transition={300}
      />
      :
      <Image
        source={{ uri: data }}
        style={[{
          width: viewSize,
          height: viewSize,
          borderRadius: viewSize
        }, style]}
      />
  );
};

export default Thumbnail;