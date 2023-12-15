import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const AlignLeftIcon = (props: SvgProps & IconProps) => (
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
          d="M14 18a1 1 0 0 1 .117 1.993L14 20H4a1 1 0 0 1-.117-1.993L4 18h10Zm6-5a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16Zm-6-5a1 1 0 0 1 .117 1.993L14 10H4a1 1 0 0 1-.117-1.993L4 8h10Zm6-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3h16Z"
        />
      </Svg>
    </View>
  </View>
);

export default AlignLeftIcon;