import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import Login from './Login';

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
    const tree = render(<Login {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should show the correct input validation', async () => {
    props = createTestProps({});

    render(<Login {...props} />);

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

    render(<Login {...props} />);

    const signup = screen.getByTestId('signup-btn');
    await act(() => {
      fireEvent.press(signup);
    });

    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});
