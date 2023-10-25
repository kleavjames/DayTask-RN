import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useCollectionData} from '@skillnation/react-native-firebase-hooks/firestore';
import {Button, Text} from '../../components';
import {globalStyles} from '../../themes';
import {useTodoCollections} from '../../hooks/useTodoCollections';

const Home = () => {
  const collections = useTodoCollections();
  const [todoDocs] = useCollectionData(collections);

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
