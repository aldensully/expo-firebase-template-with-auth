import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";
const BackIcon = (props: SvgProps & IconProps) => (
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
          d="m9 14-4-4 4-4"
        />
        <Path
          stroke={props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10h11a4 4 0 1 1 0 8h-1"
        />
      </Svg>
    </View>
  </View>
);

export default BackIcon;