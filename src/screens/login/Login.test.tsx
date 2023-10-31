import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import Login from './Login';
import {PaperProvider} from 'react-native-paper';

jest.useFakeTimers();

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('LoginScreen', () => {
  let props: any;

  it('should render correctly', () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <Login {...props} />
      </PaperProvider>
    );

    const tree = render(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should show the correct input validation', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <Login {...props} />
      </PaperProvider>
    );

    render(component);

    const emailAdd = screen.getByTestId('login-email');
    const password = screen.getByTestId('login-password');
    const loginBtn = screen.getByTestId('login-btn');

    await act(() => {
      fireEvent.press(loginBtn);
    });

    expect(emailAdd.props.errorMessage).toBe('Email address is required');
    expect(password.props.errorMessage).toBe('Password is required');
  });

  it('should navigate to sign up screen', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <Login {...props} />
      </PaperProvider>
    );

    render(component);

    const signup = screen.getByTestId('signup-btn');
    await act(() => {
      fireEvent.press(signup);
    });

    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});