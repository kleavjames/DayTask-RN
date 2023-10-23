import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import {colors, globalStyles} from '../../themes';
import {Button, Divider, Input, Text} from '../../components';
import {
  EyelashIcon,
  GoogleIcon,
  LockIcon,
  UserTagIcon,
} from '../../assets/icons';
import {AuthStackParamList} from '../../navigation/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});

const Login: FC<Props> = ({navigation}) => {
  const renderGoogleIcon = () => {
    return <GoogleIcon />;
  };

  const onNavigateSignUp = () => {
    navigation.navigate('SignUp');
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
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}>
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            }) => (
              <>
                <Input
                  inputLabel="Email Address"
                  testID="login-email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                  left={<UserTagIcon />}
                  renderError={!!errors.email && !!touched.email}
                  errorMessage={errors.email}
                />
                <Input
                  inputLabel="Password"
                  testID="login-password"
                  secureTextEntry
                  left={<LockIcon />}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize="none"
                  right={<EyelashIcon />}
                  renderRight
                  renderError={!!errors.password && !!touched.password}
                  errorMessage={errors.password}
                />
                <TouchableOpacity style={styles.forgotPassWrapper}>
                  <Text style={styles.forgotPass} variant="bodyMedium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <View style={styles.loginWrapper}>
                  <Button
                    testID="login-btn"
                    mode="contained"
                    onPress={() => handleSubmit()}>
                    Log In
                  </Button>
                </View>
              </>
            )}
          </Formik>
          <Divider dividerText="or continue with" style={styles.divider} />
          <View>
            <Button mode="outlined" onPress={() => {}} icon={renderGoogleIcon}>
              Google
            </Button>
          </View>
          <Text variant="bodyMedium" style={styles.noAccount}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={onNavigateSignUp} testID="signup-btn">
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
