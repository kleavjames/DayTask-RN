import React, {FC} from 'react';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import Text from './Text';
import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../themes';

interface Props {
  visible: boolean;
  containerStyle?: ViewStyle;
  loaderText?: string;
}

const Loader: FC<Props> = ({visible, loaderText = 'Loading'}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissableBackButton={false}
        contentContainerStyle={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>{loaderText}</Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.foreground,
    alignSelf: 'center',
    padding: 20,
    maxWidth: 200,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    marginTop: 20,
  },
});

export default Loader;
