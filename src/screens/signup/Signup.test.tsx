import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import {PaperProvider} from 'react-native-paper';
import SignUp from './SignUp';

jest.useFakeTimers();

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
  },
  ...props,
});

describe('Signup Screen', () => {
  let props: any;

  it('should render correctly', () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <SignUp {...props} />
      </PaperProvider>
    );

    const tree = render(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should show the correct input validation', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <SignUp {...props} />
      </PaperProvider>
    );

    render(component);

    const fullName = screen.getByTestId('signup-fullname');
    const emailAdd = screen.getByTestId('signup-email');
    const password = screen.getByTestId('signup-password');
    const signupBtn = screen.getByTestId('signup-btn');

    await act(() => {
      fireEvent.press(signupBtn);
    });

    expect(fullName.props.errorMessage).toBe('Full name is required');
    expect(emailAdd.props.errorMessage).toBe('Email address is required');
    expect(password.props.errorMessage).toBe('Password is required');
  });

  it('should alert about accepting terms and conditions', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <SignUp {...props} />
      </PaperProvider>
    );

    render(component);

    const fullName = screen.getByTestId('signup-fullname');
    const emailAdd = screen.getByTestId('signup-email');
    const password = screen.getByTestId('signup-password');
    const signupBtn = screen.getByTestId('signup-btn');

    fireEvent.changeText(fullName, 'Kleavant James');
    fireEvent.changeText(emailAdd, 'kleavant@gmail.com');
    fireEvent.changeText(password, '12345678');

    await act(() => {
      fireEvent.press(signupBtn);
    });

    expect(
      screen.getByText(
        'Need to agree on DayTask privacy policy, terms and conditions.',
      ),
    ).toBeOnTheScreen();
  });

  it('should navigate back to login', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <SignUp {...props} />
      </PaperProvider>
    );

    render(component);

    const signup = screen.getByTestId('signup-login-btn');
    await act(() => {
      fireEvent.press(signup);
    });

    expect(props.navigation.pop).toHaveBeenCalledTimes(1);
  });

  it('should show signing up...', async () => {
    props = createTestProps({});
    const component = (
      <PaperProvider>
        <SignUp {...props} />
      </PaperProvider>
    );

    render(component);

    const fullName = screen.getByTestId('signup-fullname');
    const emailAdd = screen.getByTestId('signup-email');
    const password = screen.getByTestId('signup-password');
    const checkbox = screen.getByRole('checkbox');
    const signupBtn = screen.getByTestId('signup-btn');

    fireEvent.changeText(fullName, 'Kleavant James');
    fireEvent.changeText(emailAdd, 'kleavant@gmail.com');
    fireEvent.changeText(password, '12345678');
    fireEvent.press(checkbox);

    await act(() => {
      fireEvent.press(signupBtn);
    });

    expect(screen.getByText('Signing up...')).toBeOnTheScreen();
  });
});
