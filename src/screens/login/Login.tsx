import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, globalStyles} from '../../themes';
import {Button, Divider, Input, Text} from '../../components';
import {EyelashIcon, LockIcon, UserTagIcon} from '../../assets/icons';

const styles = StyleSheet.create({
  logo: {
    ...globalStyles.logo,
    alignSelf: 'center',
  },
  welcomeBack: {
    color: colors.white,
    marginTop: 20,
  },
  forgotPass: {
    textAlign: 'right',
    color: colors.label,
    marginTop: 5,
  },
  forgotPassWrapper: {
    alignSelf: 'flex-end',
  },
  loginWrapper: {
    marginTop: 40,
  },
  divider: {
    marginVertical: 30,
  },
});

const Login = () => {
  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={globalStyles.flex}>
        <View style={globalStyles.flex}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
            resizeMode="center"
          />
          <Text variant="titleLarge" style={styles.welcomeBack}>
            Welcome Back!
          </Text>
          <Input inputLabel="Email Address" left={<UserTagIcon />} />
          <Input
            inputLabel="Password"
            secureTextEntry
            left={<LockIcon />}
            right={<EyelashIcon />}
            renderRight
          />
          <TouchableOpacity style={styles.forgotPassWrapper}>
            <Text style={styles.forgotPass} variant="bodyMedium">
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={styles.loginWrapper}>
            <Button mode="contained" onPress={() => {}}>
              Log In
            </Button>
          </View>
          <Divider dividerText="or continue with" style={styles.divider} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
