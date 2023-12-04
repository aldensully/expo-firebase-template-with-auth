import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const ProfileIcon = (props: SvgProps & IconProps) => (
  <View style={{
    width: props.size ?? 24,
    height: props.size ?? 24,
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <View style={{ aspectRatio: 1 }}>
      <Svg
        width={'100%'}
        height={'100%'}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <Path
          stroke={props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
        />
      </Svg>
    </View>
  </View>
);

export default ProfileIcon;