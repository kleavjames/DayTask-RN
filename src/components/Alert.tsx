import React, {FC} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Text from './Text';
import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../themes';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  okText?: string;
  dismissText?: string;
  children: React.ReactNode;
}

const width = Dimensions.get('window').width;

const Alert: FC<Props> = ({
  visible,
  onDismiss,
  containerStyle,
  onPress,
  okText = 'Ok',
  dismissText = 'Cancel',
  children,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissableBackButton={false}
        contentContainerStyle={[styles.container, containerStyle]}>
        {children}
        <View style={styles.buttons}>
          {onPress && (
            <TouchableOpacity onPress={onPress}>
              <Text style={{color: colors.primary}}>{okText}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onDismiss}>
            <Text style={{color: colors.white}}>{dismissText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.foreground,
    width: width / 1.3,
    alignSelf: 'center',
    padding: 20,
    minHeight: 150,
  },
  buttons: {
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Alert;
