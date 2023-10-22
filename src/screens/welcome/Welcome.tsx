import React, {FC} from 'react';
import {SafeAreaView, Image, View, Dimensions, StyleSheet} from 'react-native';
import {colors, globalStyles} from '../../themes';
import {Button, Text} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/auth';

const {height} = Dimensions.get('window');

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
            style={globalStyles.logo}
            source={require('../../assets/images/logo.png')}
            resizeMode="center"
          />
          <Image
            style={styles.welcomeImg}
            source={require('../../assets/images/welcome.png')}
            resizeMode="contain"
          />
          <Text variant="displayMedium" style={styles.header}>
            Manage your Task with
          </Text>
          <Text variant="displayMedium" style={styles.title}>
            DayTask
          </Text>
        </View>
        <Button mode="contained" onPress={navigateStart}>
          Let's Start
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeImg: {
    width: '100%',
    height: height / 2.5,
  },
  header: {
    color: colors.white,
  },
  title: {
    color: colors.primary,
  },
});

export default Welcome;
