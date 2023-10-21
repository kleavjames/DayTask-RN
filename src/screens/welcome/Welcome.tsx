import React, {FC} from 'react';
import {SafeAreaView, Image, View, Dimensions, StyleSheet} from 'react-native';
import {colors, globalStyles} from '../../themes';
import {Button, Text} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/auth';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
  welcomeImg: {
    width: '100%',
    height: height / 2.5,
  },
  header: {
    color: colors.white,
    fontSize: 50,
    lineHeight: 55,
  },
  title: {
    color: colors.primary,
    fontSize: 50,
    lineHeight: 55,
  },
});

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const Welcome: FC<Props> = ({navigation}) => {
  const navigateStart = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={globalStyles.flex}>
        <View style={globalStyles.flex}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
            resizeMode="center"
          />
          <Image
            style={styles.welcomeImg}
            source={require('../../assets/images/welcome.png')}
            resizeMode="contain"
          />
          <Text variant="displayLarge" style={styles.header}>
            Manage your Task with
          </Text>
          <Text variant="displayLarge" style={styles.title}>
            DayTask
          </Text>
        </View>
        <Button
          mode="contained"
          textColor={colors.black}
          onPress={navigateStart}>
          Let's Start
        </Button>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;
