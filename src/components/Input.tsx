import React, {FC} from 'react';
import {
  HelperText,
  TextInput,
  TextInputProps,
  MD3Colors,
} from 'react-native-paper';
import {colors, fontConfig, globalStyles} from '../themes';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

interface Props extends TextInputProps {
  inputLabel?: string;
  renderError?: boolean;
  errorMessage?: string;
  renderRight?: boolean;
}

const Input: FC<Props> = props => {
  return (
    <View style={styles.wrapper}>
      {props.inputLabel && (
        <Text variant="bodyMedium" style={styles.label}>
          {props.inputLabel}
        </Text>
      )}
      <View style={globalStyles.relative}>
        <View style={styles.leftIcon}>{props.left}</View>
        <TextInput
          theme={{
            fonts: {
              default: fontConfig.default,
            },
          }}
          {...props}
          mode="outlined"
          outlineStyle={styles.outline}
          outlineColor={colors.foreground}
          textColor={colors.white}
          dense
          contentStyle={[globalStyles.textAlignAuto, props.contentStyle]}
        />
        {props.renderRight && (
          <View style={styles.rightIcon}>{props.right}</View>
        )}
      </View>
      {props.renderError && (
        <HelperText
          theme={{
            fonts: {
              default: fontConfig.default,
            },
          }}
          type="error"
          style={styles.error}
          visible>
          {props.errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  outline: {
    borderRadius: 0,
    backgroundColor: colors.foreground,
    borderWidth: 1,
  },
  label: {
    color: colors.label,
    marginBottom: 10,
  },
  error: {
    color: MD3Colors.error50,
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 1000,
    left: 15,
    top: 12,
  },
  rightIcon: {
    position: 'absolute',
    zIndex: 1000,
    right: 15,
    top: 12,
  },
});

export default Input;
