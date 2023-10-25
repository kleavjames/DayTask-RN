import {useCallback, useEffect, useMemo} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useUserStore} from './useUser';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const useTodoCollections = () => {
  const fullName = useUserStore(state => state.fullName);
  const loggedInUser = useMemo(() => auth().currentUser, []);

  const setUserLoggedIn = useCallback(() => {
    firestore().collection('users').doc(loggedInUser?.uid).set({
      fullName,
    });
  }, [loggedInUser?.uid, fullName]);

  useEffect(() => {
    setUserLoggedIn();
  }, [setUserLoggedIn]);

  const todoCollection = useMemo(
    () =>
      firestore()
        .collection('users')
        .doc(loggedInUser?.uid)
        .collection('todos'),
    [loggedInUser?.uid],
  );

  return todoCollection;
};
