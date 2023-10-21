import React, {FC} from 'react';
import {Text as PaperText, TextProps} from 'react-native-paper';
import {TextComponent} from 'react-native';

const Text: FC<TextProps<TextComponent>> = props => {
  return <PaperText {...props}>{props.children}</PaperText>;
};

export default Text;
