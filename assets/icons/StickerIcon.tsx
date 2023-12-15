import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const StickerIcon = (props: SvgProps & IconProps) => (
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
          d="M18 3a3 3 0 0 1 2.995 2.824L21 6v7.172a3 3 0 0 1-.743 1.976l-.136.145-4.828 4.828a3 3 0 0 1-1.923.872l-.198.007H6a3 3 0 0 1-2.995-2.824L3 18V6a3 3 0 0 1 2.824-2.995L6 3h12Zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6v-4a3 3 0 0 1 3-3h4V6a1 1 0 0 0-1-1Zm.586 9H15a1 1 0 0 0-.993.883L14 15v3.586L18.586 14Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  </View>
);

export default StickerIcon;