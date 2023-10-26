import React, {useCallback} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {globalStyles} from '../../themes';
import {Button, Text} from '../../components';
import {useUserStore} from '../../hooks/useUser';

const Profile = () => {
  const fullName = useUserStore(state => state.fullName);

  const logout = useCallback(() => {
    auth().signOut();
  }, []);

  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={globalStyles.flex}>
        <View style={styles.wrapper}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/prof-pic.png')}
            resizeMode="contain"
          />
          <View style={styles.profile}>
            <Text style={styles.profileText}>
              Hi there,{'\n'}
              <Text variant="displaySmall" style={globalStyles.textPrimary}>
                {fullName}
              </Text>
            </Text>
          </View>
        </View>
        <Button onPress={logout} mode="outlined">
          Log out
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
  wrapper: {
    ...globalStyles.flex,
    alignItems: 'center',
  },
  profile: {
    marginTop: 20,
  },
  profileText: {
    fontFamily: 'PilatExtended-DemiBold',
    ...globalStyles.textWhite,
    fontSize: 30,
  },
});

export default Profile;
