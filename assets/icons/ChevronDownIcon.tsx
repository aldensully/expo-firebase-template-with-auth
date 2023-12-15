import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const ChevronDownIcon = (props: SvgProps & IconProps) => (
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
          d="M12.157 17.555c.252 0 .503-.1.673-.292l7.775-7.965a.896.896 0 0 0 .271-.643.9.9 0 0 0-.914-.924c-.251 0-.482.1-.653.261l-7.694 7.865h1.075L4.996 7.992a.918.918 0 0 0-.653-.261.9.9 0 0 0-.914.924c0 .251.1.472.27.653l7.775 7.955c.191.191.422.292.683.292Z"
        />
      </Svg>
    </View>
  </View>
);

export default ChevronDownIcon;