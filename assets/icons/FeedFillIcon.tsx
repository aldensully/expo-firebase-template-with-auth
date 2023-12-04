import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const FeedFillIcon = (props: SvgProps & IconProps) => (
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
          fill={props.color}
          d="m10.348 3.169-7.15 3.113a2 2 0 0 0-1.03 2.608l4.92 11.895a1.96 1.96 0 0 0 2.59 1.063l7.142-3.11a2.002 2.002 0 0 0 1.036-2.611l-4.92-11.894a1.96 1.96 0 0 0-2.588-1.064ZM16 3a2 2 0 0 1 1.995 1.85L18 5v3.5a1 1 0 0 1-1.993.117L16 8.5V5h-1a1 1 0 0 1-.117-1.993L15 3h1Zm3.08 2.61a1 1 0 0 1 1.31-.53c.257.108.505.21.769.314a2 2 0 0 1 1.114 2.479l-.056.146-2.298 5.374a1 1 0 0 1-1.878-.676l.04-.11 2.296-5.371-.366-.148-.402-.167a1 1 0 0 1-.53-1.312v.001Z"
        />
      </Svg>
    </View>
  </View>
);

export default FeedFillIcon;