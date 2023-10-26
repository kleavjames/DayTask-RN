import {useMemo} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const useTodoCollections = () => {
  const loggedInUser = useMemo(() => auth().currentUser, []);

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
