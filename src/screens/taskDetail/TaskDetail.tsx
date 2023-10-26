import React, {FC, useMemo, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Alert, Button, Checkbox, Input, Text} from '../../components';
import {colors, globalStyles} from '../../themes';
import {ITask, useTodoCollections} from '../../hooks/useTodoCollections';
import {MainStackParamList} from '../../navigation/main';
import {uuid} from '../../assets/utils/string';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskDetail'>;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title must not be empty'),
  description: Yup.string().required('Description must not be empty'),
  completed: Yup.bool().required(),
});

const TodoDetail: FC<Props> = ({navigation, route}) => {
  const {task = undefined, type} = route.params;
  const collection = useTodoCollections();

  const [onDelete, setOnDelete] = useState(false);

  const todoData = useMemo<ITask>(() => {
    if (type === 'edit') {
      return task as ITask;
    } else {
      return {
        title: '',
        description: '',
        completed: false,
        id: '',
      };
    }
  }, [task, type]);

  const onSubmitTodo = (values: ITask) => {
    if (type === 'edit') {
      collection.doc(values.id).set(values);
    } else {
      const todoObj = {
        ...values,
        id: uuid(),
      };
      collection.doc(todoObj.id).set(todoObj);
    }
    navigation.goBack();
  };

  const onDeleteTodo = () => {
    collection.doc(todoData.id).delete();
    setOnDelete(false);
    navigation.goBack();
  };

  return (
    <>
      <Alert
        visible={onDelete}
        onDismiss={() => setOnDelete(false)}
        onPress={onDeleteTodo}
        okText="Delete"
        dismissText="Cancel">
        <Text style={globalStyles.textWhite}>
          Are you sure you want to delete this task?
        </Text>
      </Alert>
      <KeyboardAwareScrollView style={globalStyles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={globalStyles.flex}>
            <View style={globalStyles.flex}>
              <Formik
                initialValues={todoData}
                onSubmit={onSubmitTodo}
                validationSchema={validationSchema}>
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <Input
                      inputLabel="Task Title"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      autoCapitalize="none"
                      renderError={!!errors.title && !!touched.title}
                      errorMessage={errors.title}
                    />
                    <Input
                      inputLabel="Task Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      autoCapitalize="none"
                      multiline
                      contentStyle={styles.description}
                      renderError={
                        !!errors.description && !!touched.description
                      }
                      errorMessage={errors.description}
                    />
                    <View style={styles.checkbox}>
                      <Checkbox
                        status={values.completed ? 'checked' : 'indeterminate'}
                        onPress={() =>
                          setFieldValue('completed', !values.completed)
                        }>
                        {values.completed ? (
                          <Text variant="bodyMedium" style={styles.isCompleted}>
                            task is completed!
                          </Text>
                        ) : (
                          <Text variant="bodyMedium" style={styles.isCompleted}>
                            Is the task completed?
                          </Text>
                        )}
                      </Checkbox>
                    </View>
                    {type === 'edit' && (
                      <Button
                        mode="outlined"
                        onPress={() => setOnDelete(true)}
                        style={styles.delete}>
                        Delete
                      </Button>
                    )}
                    <Button mode="contained" onPress={() => handleSubmit()}>
                      {type === 'edit' ? 'Update Task' : 'Create Task'}
                    </Button>
                  </>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  isCompleted: {
    color: colors.white,
  },
  checkbox: {
    marginTop: 5,
    marginBottom: 50,
  },
  description: {
    maxHeight: 150,
  },
  delete: {
    marginBottom: 10,
  },
});

export default TodoDetail;
