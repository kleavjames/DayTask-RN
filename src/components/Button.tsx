import React, {FC} from 'react';
import {Button as PaperButton, ButtonProps} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {colors, fontConfig} from '../themes';

const styles = StyleSheet.create({
  border: {
    borderRadius: 0,
  },
  padding: {
    paddingVertical: 5,
  },
});

const Button: FC<ButtonProps> = props => {
  return (
    <PaperButton
      {...props}
      style={styles.border}
      contentStyle={styles.padding}
      textColor={props.mode === 'contained' ? colors.black : colors.white}
      theme={{
        fonts: {
          default: fontConfig.default,
        },
      }}>
      {props.children}
    </PaperButton>
  );
};

export default Button;
