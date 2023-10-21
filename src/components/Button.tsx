import React, {FC} from 'react';
import {Button as PaperButton, ButtonProps} from 'react-native-paper';
import {StyleSheet} from 'react-native';

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
    <PaperButton {...props} style={styles.border} contentStyle={styles.padding}>
      {props.children}
    </PaperButton>
  );
};

export default Button;
