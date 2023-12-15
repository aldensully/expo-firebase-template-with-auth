import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const KeyboardIcon = (props: SvgProps & IconProps) => (
  <View style={{
    width: props.size,
    height: props.size,
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
          d="M20.836 4.5a2 2 0 0 1 1.995 1.85l.005.15v12a2 2 0 0 1-1.85 1.994l-.15.005h-16a2 2 0 0 1-1.995-1.85l-.005-.15v-12a2 2 0 0 1 1.85-1.995l.15-.005h16Zm0 2h-16v12h16v-12Zm-3 8a1 1 0 0 1 .117 1.992l-.117.007h-10a1 1 0 0 1-.117-1.993l.117-.007h10Zm-9-3a1 1 0 1 1 0 2h-1a1 1 0 0 1 0-2h1Zm4.5 0a1 1 0 0 1 .117 1.992l-.117.007h-1a1 1 0 0 1-.117-1.993l.117-.007h1Zm4.5 0a1 1 0 1 1 0 2h-1a1 1 0 0 1 0-2h1Zm-9-3a1 1 0 0 1 .117 1.992l-.117.007h-1a1 1 0 0 1-.117-1.993l.117-.007h1Zm4.5 0a1 1 0 1 1 0 2h-1a1 1 0 0 1 0-2h1Zm4.5 0a1 1 0 0 1 .117 1.992l-.117.007h-1a1 1 0 0 1-.117-1.993l.117-.007h1Z"
        />
      </Svg>
    </View>
  </View>
);

export default KeyboardIcon;