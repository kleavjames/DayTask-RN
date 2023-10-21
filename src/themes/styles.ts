import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },
  flex: {
    flex: 1,
  },
  relative: {
    position: 'relative',
  },
  textAlignAuto: {
    textAlign: 'auto',
  },
});
