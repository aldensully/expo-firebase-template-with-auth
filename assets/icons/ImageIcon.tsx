import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const ImageIcon = (props: SvgProps & IconProps) => (
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
          d="M20 6a2 2 0 0 1 2 2v11.333a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h13Zm-8.268 7.944L7.136 18.54l-.066.06-.07.054v.68h13v-.68l-.07-.053-.066-.06-2.24-2.24-.353.354.055.055a1 1 0 0 1-1.32 1.497l-.094-.083-4.18-4.18ZM17 3a2 2 0 0 1 1.995 1.85L19 5H5a1 1 0 0 0-.993.883L4 6v12a2 2 0 0 1-1.995-1.85L2 16V6a3 3 0 0 1 2.824-2.995L5 3h12Zm3 5H7v7.848L10.848 12a1.251 1.251 0 0 1 1.768 0l3.241 3.24.884-.883a1.251 1.251 0 0 1 1.768 0L20 15.848V8Zm-3.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
      </Svg>
    </View>
  </View>
);

export default ImageIcon;