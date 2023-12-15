import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { IconProps } from "../../src/types";
import { View } from "react-native";

const ChevronRightIcon = (props: SvgProps & IconProps) => (
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
          d="M16.68 12.147c0-.25-.1-.482-.29-.663L8.434 3.69a.934.934 0 0 0-.663-.261.899.899 0 0 0-.914.914c0 .25.1.482.261.653l7.313 7.151L7.118 19.3a.935.935 0 0 0-.26.653c0 .522.4.914.913.914.261 0 .482-.09.663-.271l7.956-7.785a.915.915 0 0 0 .29-.663Z"
        />
      </Svg>
    </View>
  </View>
);

export default ChevronRightIcon;