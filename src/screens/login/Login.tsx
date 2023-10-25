import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik, FormikValues} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import {colors, globalStyles} from '../../themes';
import {Alert, Button, Divider, Input, Loader, Text} from '../../components';
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
    .min(6, 'Password must be at least 6 characters'),
});

const Login: FC<Props> = ({navigation}) => {
  const [onLogin, setOnLogin] = useState(false);
  const [loginFailed, setOnLoginFailed] = useState(false);

  const renderGoogleIcon = () => {
    return <GoogleIcon />;
  };

  const onNavigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onHandleSubmit = useCallback(async (values: FormikValues) => {
    try {
      setOnLogin(true);
      setOnLoginFailed(false);
      await auth().signInWithEmailAndPassword(values.email, values.password);
      setOnLogin(false);
    } catch (error) {
      console.log(error);
      setOnLogin(false);
      setOnLoginFailed(true);
    }
  }, []);

  return (
    <>
      <Loader visible={onLogin} loaderText="Logging in..." />
      <Alert
        visible={loginFailed}
        onDismiss={() => setOnLoginFailed(false)}
        dismissText="Ok">
        <Text style={globalStyles.textWhite}>Failed to login</Text>
      </Alert>
      <KeyboardAvoidingView behavior="padding" style={globalStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onSubmit={onHandleSubmit}
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
                <Button
                  mode="outlined"
                  onPress={() => {}}
                  icon={renderGoogleIcon}>
                  Google
                </Button>
              </View>
              <Text variant="bodyMedium" style={styles.noAccount}>
                Don't have an account?{' '}
                <TouchableOpacity
                  onPress={onNavigateSignUp}
                  testID="signup-btn">
                  <Text style={globalStyles.textPrimary}>Sign Up</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
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
