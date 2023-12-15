import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";
const UndoIcon = (props: SvgProps & IconProps) => (
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
          d="M6.046 11.677A7.5 7.5 0 0 1 20 15.5a1 1 0 0 0 2 0A9.5 9.5 0 0 0 4.78 9.963l-.537-3.045a1 1 0 1 0-1.97.347l1.042 5.909a1 1 0 0 0 .885.822 1.1 1.1 0 0 0 .502-.052l5.68-1.001a1 1 0 1 0-.347-1.97l-3.989.704Z"
        />
      </Svg>
    </View>
  </View>
);

export default UndoIcon;