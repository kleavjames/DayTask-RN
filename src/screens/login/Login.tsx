import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {globalStyles} from '../../themes';

const Login = () => {
  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={globalStyles.flex}>{/* Login */}</SafeAreaView>
    </View>
  );
};

export default Login;
