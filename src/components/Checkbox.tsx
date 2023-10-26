import React, {FC} from 'react';
import {CheckboxProps, Checkbox as PaperCheckbox} from 'react-native-paper';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface Props extends CheckboxProps {
  children?: React.ReactNode;
  styles?: ViewStyle;
}

const Checkbox: FC<Props> = props => {
  return (
    <View style={[styles.wrapper, props.styles]}>
      <PaperCheckbox status={props.status} onPress={props.onPress} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Checkbox;
