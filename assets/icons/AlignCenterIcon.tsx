import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const AlignCenterIcon = (props: SvgProps & IconProps) => (
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
          d="M17.25 18a1 1 0 0 1 .117 1.993L17.25 20h-10a1 1 0 0 1-.117-1.993L7.25 18h10Zm3-5a1 1 0 0 1 0 2h-16a1 1 0 0 1 0-2h16Zm-3-5a1 1 0 0 1 .117 1.993L17.25 10h-10a1 1 0 0 1-.117-1.993L7.25 8h10Zm3-5a1 1 0 0 1 .117 1.993L20.25 5h-16a1 1 0 0 1-.117-1.993L4.25 3h16Z"
        />
      </Svg>
    </View>
  </View>
);

export default AlignCenterIcon;