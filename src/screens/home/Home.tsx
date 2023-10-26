import React, {FC, useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCollectionData} from '@skillnation/react-native-firebase-hooks/firestore';
import {Button, Checkbox, Header, Text} from '../../components';
import {colors, globalStyles} from '../../themes';
import {ITask, useTodoCollections} from '../../hooks/useTodoCollections';
import {MainStackParamList} from '../../navigation/main';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home: FC<Props> = ({navigation}) => {
  const todoCollection = useTodoCollections();
  const [todoDocs] = useCollectionData(todoCollection);

  const onCompleteTask = useCallback(
    (task: ITask) => {
      todoCollection.doc(task.id).update({
        completed: !task.completed,
      });
    },
    [todoCollection],
  );

  const onAddTodo = () => {
    navigation.navigate('TaskDetail', {
      type: 'add',
    });
  };

  const onEditTodo = useCallback(
    (task: ITask) => {
      navigation.navigate('TaskDetail', {
        type: 'edit',
        task,
      });
    },
    [navigation],
  );

  const renderTodoItems = useCallback<ListRenderItem<ITask>>(
    ({item}) => {
      return (
        <View style={styles.todoWrapper}>
          <TouchableOpacity
            style={globalStyles.flex}
            onPress={() => onEditTodo(item)}>
            <Text variant="titleMedium" style={globalStyles.textWhite}>
              {item.title}
            </Text>
            <Text variant="bodySmall" style={globalStyles.textLabel}>
              {item.description.length > 35
                ? item.description.substring(0, 35) + '...'
                : item.description}
            </Text>
          </TouchableOpacity>
          <Checkbox
            onPress={() => onCompleteTask(item)}
            styles={styles.check}
            status={item.completed ? 'checked' : 'unchecked'}
          />
        </View>
      );
    },
    [onCompleteTask, onEditTodo],
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmptyComponent = () => (
    <View>
      <Text style={styles.empty}>No tasks to display.</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={globalStyles.flex}>
        <Header />
        <View style={styles.todoList}>
          <FlatList
            data={todoDocs as ITask[]}
            keyExtractor={todo => todo.id.toString()}
            renderItem={renderTodoItems}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
        <Button onPress={onAddTodo} mode="contained">
          Add Task
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  todoWrapper: {
    backgroundColor: colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  check: {
    borderWidth: 1,
    borderColor: colors.primary,
    maxHeight: 40,
    alignSelf: 'center',
  },
  separator: {
    marginTop: 15,
  },
  todoList: {
    marginTop: 50,
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: colors.foreground,
  },
});

export default Home;
