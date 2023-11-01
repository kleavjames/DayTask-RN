import {Dimensions, PixelRatio, ScaledSize} from 'react-native';

type Mode = 'width' | 'height';
type Scale = number;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}: ScaledSize =
  Dimensions.get('window');
const widthScale: Scale = SCREEN_WIDTH / 414;
const heightScale: Scale = SCREEN_HEIGHT / 896;

export const normalize = (size: Scale, based: Mode = 'width'): Scale => {
  const newSize = based === 'height' ? size * heightScale : size * widthScale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
