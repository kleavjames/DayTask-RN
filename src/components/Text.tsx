import React, {FC} from 'react';
import {Text as PaperText, TextProps} from 'react-native-paper';
import {TextComponent} from 'react-native';
import {fontConfig} from '../themes';

const Text: FC<TextProps<TextComponent>> = props => {
  return (
    <PaperText
      {...props}
      theme={{
        fonts: {
          default: fontConfig.default,
        },
      }}>
      {props.children}
    </PaperText>
  );
};

export default Text;
