import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Divider as PaperDivider} from 'react-native-paper';
import Text from './Text';
import {colors, globalStyles} from '../themes';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerText: {
    color: colors.label,
    paddingHorizontal: 20,
  },
  divider: {
    ...globalStyles.flex,
    borderColor: colors.label,
  },
  soloDivider: {
    borderColor: colors.label,
  },
});

interface Props {
  dividerText?: string;
  style?: ViewStyle;
}

const Divider: FC<Props> = ({dividerText, style}) => {
  if (!dividerText) {
    return (
      <View style={style}>
        <PaperDivider style={styles.soloDivider} />
      </View>
    );
  }

  return (
    <>
      <View style={[styles.wrapper, style]}>
        <PaperDivider style={styles.divider} />
        <Text variant="bodyMedium" style={styles.dividerText}>
          {dividerText}
        </Text>
        <PaperDivider style={styles.divider} />
      </View>
    </>
  );
};

export default Divider;
