import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AuthStack from './auth';
import MainStack from './main';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Loader} from '../components';
import {useUserCollection} from '../hooks/useUserCollection';
import {useUserStore} from '../hooks/useUser';

const RootStack = () => {
  const {getAuthUser, saveUser} = useUserCollection();
  const {setFullName, fullName} = useUserStore(state => state);

  const [initializing, setInitializing] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState();

  const onUserUpdate = useCallback(
    async (user: any) => {
      const authUser = await getAuthUser(user);
      if (!fullName) {
        const fullNamefromDB = authUser.data()?.fullName;
        setFullName(fullNamefromDB);
      } else {
        saveUser(user, fullName);
      }
    },
    [fullName, getAuthUser, saveUser, setFullName],
  );

  const onAuthStateChanged = useCallback(
    async (user: any) => {
      if (user) {
        await onUserUpdate(user);
      }
      setUserLoggedIn(user);

      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, onUserUpdate],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent />
      <Loader visible={initializing} loaderText="Checking for user..." />
      {userLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
