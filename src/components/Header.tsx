import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from './Text';
import {globalStyles} from '../themes';
import {useUserStore} from '../hooks/useUser';
import {HomeNavigationProp} from '../navigation/main';

const Header: FC = () => {
  const fullName = useUserStore(state => state.fullName);
  const navigation = useNavigation<HomeNavigationProp>();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={globalStyles.textPrimary} variant="labelMedium">
          Welcome back!
        </Text>
        <Text variant="titleMedium" style={styles.name}>
          {fullName}
        </Text>
      </View>
      <TouchableOpacity onPress={navigateToProfile}>
        <Image
          style={styles.image}
          source={require('../assets/images/prof-pic.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  image: {
    height: 40,
    width: 40,
  },
  name: {
    fontFamily: 'PilatExtended-DemiBold',
    ...globalStyles.textWhite,
  },
});

export default Header;
