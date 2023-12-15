import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const AlignRightIcon = (props: SvgProps & IconProps) => (
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
          d="M20.5 18a1 1 0 0 1 .117 1.993L20.5 20h-10a1 1 0 0 1-.117-1.993L10.5 18h10Zm0-5a1 1 0 0 1 0 2h-16a1 1 0 0 1 0-2h16Zm0-5a1 1 0 0 1 .117 1.993L20.5 10h-10a1 1 0 0 1-.117-1.993L10.5 8h10Zm0-5a1 1 0 0 1 .117 1.993L20.5 5h-16a1 1 0 0 1-.117-1.993L4.5 3h16Z"
        />
      </Svg>
    </View>
  </View>
);

export default AlignRightIcon;