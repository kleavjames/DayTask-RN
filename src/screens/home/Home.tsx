import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button, Text} from '../../components';
import {globalStyles} from '../../themes';

const Home = () => {
  return (
    <View
      style={[
        globalStyles.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text style={globalStyles.textWhite}>Home</Text>
      <Button onPress={() => auth().signOut()}>Logout</Button>
    </View>
  );
};

export default Home;
