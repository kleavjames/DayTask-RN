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
import {
  EyelashIcon,
  GoogleIcon,
  LockIcon,
  UserTagIcon,
} from '../../assets/icons';

const Login = () => {
  const renderGoogleIcon = () => {
    return <GoogleIcon />;
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
          <View>
            <Button mode="outlined" onPress={() => {}} icon={renderGoogleIcon}>
              Google
            </Button>
          </View>
          <Text variant="bodyMedium" style={styles.noAccount}>
            Don't have an account?{' '}
            <TouchableOpacity>
              <Text style={globalStyles.textPrimary}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

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
    marginVertical: 40,
  },
  noAccount: {
    color: colors.label,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Login;
