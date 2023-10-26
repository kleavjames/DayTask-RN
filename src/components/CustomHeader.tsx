import React, {FC} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from '../assets/icons';
import Text from './Text';
import {Appbar} from 'react-native-paper';
import {colors, globalStyles} from '../themes';
import {getHeaderTitle} from '@react-navigation/elements';

const CustomHeader: FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
}) => {
  const title = getHeaderTitle(options, route.name);

  const goBack = () => {
    navigation.pop();
  };

  return (
    <Appbar.Header style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={globalStyles.textWhite}>{title}</Text>
        </View>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    ...globalStyles.flex,
    marginLeft: 20,
  },
});

export default CustomHeader;
