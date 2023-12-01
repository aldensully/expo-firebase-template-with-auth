import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { View } from "../../src/Theme/Themed";
import { IconProps } from "../../src/types";
const CloseIcon = (props: SvgProps & IconProps) => (
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
          strokeWidth={2.212}
          d="m6.525 6.525 10.95 10.95m-10.95 0 10.95-10.95"
        />
      </Svg>
    </View>
  </View>
);

export default CloseIcon;