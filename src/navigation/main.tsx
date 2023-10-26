import React from 'react';
import {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import TaskDetail from '../screens/taskDetail/TaskDetail';
import {CustomHeader} from '../components';
import {ITask} from '../hooks/useTodoCollections';
import Profile from '../screens/profile/Profile';

export type MainStackParamList = {
  Home: undefined;
  TaskDetail: {
    type: 'add' | 'edit';
    task?: ITask;
  };
  Profile: undefined;
};

export type HomeNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Home'
>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const customHeader = (props: NativeStackHeaderProps) => (
  <CustomHeader {...props} />
);

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: customHeader,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{title: 'Task Detail'}}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;
