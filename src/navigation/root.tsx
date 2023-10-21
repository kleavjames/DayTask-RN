import React, {useState} from 'react';
// import auth from '@react-native-firebase/auth';
import AuthStack from './auth';
import MainStack from './main';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

const RootStack = () => {
  // const [initializing, setInitializing] = useState(true);
  const [
    userLoggedIn,
    // setUserLoggedIn
  ] = useState();

  // const onAuthStateChanged = useCallback(
  //   (user: any) => {
  //     setUserLoggedIn(user);
  //     if (initializing) {
  //       setInitializing(false);
  //     }
  //   },
  //   [initializing],
  // );

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

  //   return subscriber;
  // }, [onAuthStateChanged]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent />
      {userLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
