import {normalize} from './size';

export const fontConfig: any = {
  displayLarge: {
    fontFamily: 'PilatExtended-DemiBold',
    fontSize: normalize(57),
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'PilatExtended-DemiBold',
    fontSize: normalize(45),
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'PilatExtended-DemiBold',
    fontSize: normalize(36),
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(32),
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(28),
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(24),
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(22),
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(16),
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(14),
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(14),
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(12),
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'Inter-Medium',
    fontSize: normalize(11),
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(16),
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(14),
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'Inter-Regular',
    fontSize: normalize(12),
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  default: {
    fontFamily: 'Inter-Regular',
    letterSpacing: 0,
  },
};

export type CustomTexts = 'normal' | 'header';
