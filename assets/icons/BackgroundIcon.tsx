import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const BackgroundIcon = (props: SvgProps & IconProps) => (
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
          d="M20.753 4.342a1 1 0 0 1-.095 1.41l-16 14a1 1 0 1 1-1.316-1.505l16-14a1 1 0 0 1 1.411.095Zm0 6.375a1 1 0 0 1-.095 1.41l-8.714 7.626a1 1 0 1 1-1.317-1.506l8.714-7.625a1 1 0 0 1 1.412.095Zm-1.412 5.78a1 1 0 0 1 1.407 1.417l-.09.089-2 1.75a1 1 0 0 1-1.406-1.417l.09-.089 1.999-1.75ZM13.468 4.342a1 1 0 0 1-.094 1.41L4.66 13.378a1 1 0 0 1-1.317-1.506l8.714-7.625a1 1 0 0 1 1.41.095h.001ZM5.77 4.247a1 1 0 0 1 1.406 1.417l-.089.089L4.66 7.878A1 1 0 0 1 3.252 6.46l.09-.089L5.77 4.247Z"
        />
      </Svg>
    </View>
  </View>
);

export default BackgroundIcon;