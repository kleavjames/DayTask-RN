import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
  },
  /**
   * image styles
   */
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
  /**
   * text styles
   */
  textAlignAuto: {
    textAlign: 'auto',
  },
  textWhite: {
    color: colors.white,
  },
  textLabel: {
    color: colors.label,
  },
  textPrimary: {
    color: colors.primary,
  },
});
