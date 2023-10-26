import {useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const useUserCollection = () => {
  const getAuthUser = useCallback(
    (user: FirebaseAuthTypes.User | null) =>
      firestore().collection('users').doc(user?.uid).get(),
    [],
  );

  const saveUser = useCallback(
    (user: FirebaseAuthTypes.User | null, fullName: string) => {
      firestore().collection('users').doc(user?.uid).set({
        fullName,
      });
    },
    [],
  );

  return {getAuthUser, saveUser};
};
