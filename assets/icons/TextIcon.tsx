import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const TextIcon = (props: SvgProps & IconProps) => (
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
          fillRule="evenodd"
          d="M5 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V6h-4v13h1a1 1 0 0 1 0 2h-4a1 1 0 0 1 0-2h1V6H7v1a1 1 0 0 1-2 0V5Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  </View>
);

export default TextIcon;