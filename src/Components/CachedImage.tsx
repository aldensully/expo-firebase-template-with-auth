import { useQuery } from "@tanstack/react-query";
import { Image, ImageProps, ImageStyle, Platform, View } from "react-native";
import { Image as ExpoImage } from 'expo-image';
import { apiFetchStorageUrl } from "../Utils/utilFns";

type Props = {
  storage_key: string;
  style?: ImageStyle;
  imageProps?: ImageProps;
};

//render profile pic or initials
const CachedImage = (props: Props) => {
  const { storage_key, style, imageProps } = props;
  const { data, isLoading } = useQuery({ queryKey: ['image', storage_key], queryFn: () => apiFetchStorageUrl(storage_key) });

  if (!data || isLoading) return null;
  if (Platform.OS === 'ios') return (
    <ExpoImage
      style={style}
      source={{ uri: data }}
      contentFit="cover"
      transition={300}
    />
  );
  return (
    <Image
      source={{ uri: data }}
      style={style}
      {...imageProps}
    />
  );
};

export default CachedImage;