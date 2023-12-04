import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const FeedIcon = (props: SvgProps & IconProps) => (
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
          d="M15 4h1a1 1 0 0 1 1 1v3.5M20 6c.264.112.52.217.768.315a1 1 0 0 1 .53 1.311L19 13M3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.27-.527L3.09 8.5a1 1 0 0 1 .514-1.303Z"
        />
      </Svg>
    </View>
  </View>
);

export default FeedIcon;