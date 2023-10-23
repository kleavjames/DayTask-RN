import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors, globalStyles} from '../../themes';
import {Button, Checkbox, Divider, Input, Text} from '../../components';
import {
  EyelashIcon,
  GoogleIcon,
  LockIcon,
  UserIcon,
  UserTagIcon,
} from '../../assets/icons';
import {AuthStackParamList} from '../../navigation/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  readTermsConditions: false,
};

const SignUp: FC<Props> = ({navigation}) => {
  const renderGoogleIcon = () => {
    return <GoogleIcon />;
  };

  const onPressLogin = () => {
    navigation.pop();
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
          <Text variant="titleLarge" style={styles.createAccount}>
            Create your account
          </Text>
          <Formik
            initialValues={initialValues}
            onSubmit={values => console.log(values)}
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
                    <Text variant="bodyMedium" style={globalStyles.textPrimary}>
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
          <Divider dividerText="or continue with" style={styles.divider} />
          <View>
            <Button mode="outlined" onPress={() => {}} icon={renderGoogleIcon}>
              Google
            </Button>
          </View>
          <Text variant="bodyMedium" style={styles.noAccount}>
            Already have an account?{' '}
            <TouchableOpacity onPress={onPressLogin}>
              <Text style={globalStyles.textPrimary}>Login</Text>
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
