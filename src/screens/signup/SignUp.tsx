import React, {FC, useCallback, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik, FormikValues} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors, globalStyles} from '../../themes';
import {Alert, Button, Checkbox, Input, Loader, Text} from '../../components';
import {EyelashIcon, LockIcon, UserIcon, UserTagIcon} from '../../assets/icons';
import {AuthStackParamList} from '../../navigation/auth';
import {useUserStore} from '../../hooks/useUser';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  readTermsConditions: false,
};

const SignUp: FC<Props> = ({navigation}) => {
  const setFullName = useUserStore(state => state.setFullName);
  const [onSignup, setOnSignup] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const onPressLogin = () => {
    navigation.pop();
  };

  const onHandleSubmit = useCallback(
    async (values: FormikValues) => {
      if (!values.readTermsConditions) {
        setAcceptTerms(true);
        return;
      }

      try {
        setOnSignup(true);
        setSignupFailed(false);
        // set full name in db
        setFullName(values.fullName);
        // create account
        await auth().createUserWithEmailAndPassword(
          values.email,
          values.password,
        );

        setOnSignup(false);
      } catch (error) {
        setOnSignup(false);
        setSignupFailed(true);
      }
    },
    [setFullName],
  );

  return (
    <>
      <Loader visible={onSignup} loaderText="Signing up..." />
      <Alert
        visible={acceptTerms}
        onDismiss={() => setAcceptTerms(false)}
        dismissText="Ok">
        <Text style={globalStyles.textWhite}>
          Need to agree on DayTask privacy policy, terms and conditions.
        </Text>
      </Alert>
      <Alert
        visible={signupFailed}
        onDismiss={() => setSignupFailed(false)}
        dismissText="Ok">
        <Text style={globalStyles.textWhite}>Failed to create an account.</Text>
      </Alert>
      <KeyboardAwareScrollView style={globalStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={globalStyles.flex}>
            <View style={globalStyles.flex}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
                resizeMode="center"
              />
              <Text variant="titleLarge" style={styles.createAccount}>
                Create your account
              </Text>
              <Formik
                initialValues={initialValues}
                onSubmit={onHandleSubmit}
                validationSchema={validationSchema}>
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <Input
                      inputLabel="Full Name"
                      testID="signup-fullname"
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                      autoCapitalize="words"
                      left={<UserIcon />}
                      renderError={!!errors.fullName && !!touched.fullName}
                      errorMessage={errors.fullName}
                    />
                    <Input
                      inputLabel="Email Address"
                      testID="signup-email"
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
                      testID="signup-password"
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
                    <Checkbox
                      status={
                        values.readTermsConditions ? 'checked' : 'indeterminate'
                      }
                      onPress={() =>
                        setFieldValue(
                          'readTermsConditions',
                          !values.readTermsConditions,
                        )
                      }>
                      <Text variant="bodyMedium" style={styles.termsConditions}>
                        I have read & agreed to DayTask{' '}
                        <Text
                          variant="bodyMedium"
                          style={globalStyles.textPrimary}>
                          privacy policy, terms & conditions.
                        </Text>
                      </Text>
                    </Checkbox>
                    <View style={styles.loginWrapper}>
                      <Button
                        testID="login-btn"
                        mode="contained"
                        onPress={() => handleSubmit()}>
                        Sign Up
                      </Button>
                    </View>
                  </>
                )}
              </Formik>
              {/* <Divider dividerText="or continue with" style={styles.divider} />
              <View>
                <Button
                  mode="outlined"
                  onPress={() => {}}
                  icon={renderGoogleIcon}>
                  Google
                </Button>
              </View> */}
              <Text variant="bodyMedium" style={styles.noAccount}>
                Already have an account?{' '}
                <TouchableOpacity onPress={onPressLogin}>
                  <Text style={globalStyles.textPrimary}>Login</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    ...globalStyles.logo,
    alignSelf: 'center',
  },
  termsConditions: {
    ...globalStyles.flex,
    ...globalStyles.textLabel,
    marginLeft: 10,
  },
  createAccount: {
    color: colors.white,
    marginTop: 20,
  },
  loginWrapper: {
    marginTop: 40,
  },
  divider: {
    marginVertical: 30,
  },
  noAccount: {
    color: colors.label,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignUp;
