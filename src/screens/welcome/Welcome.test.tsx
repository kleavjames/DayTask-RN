import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../../navigation/auth';

// solves my issue on svg
// reference error
jest.useFakeTimers();

describe('SignInScreen', () => {
  it('should render correctly', () => {
    const component = (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );

    const tree = render(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should navigate to login screen when pressing let's start", async () => {
    const component = (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );

    render(component);

    const toClick = await screen.findByText("Let's Start");
    fireEvent.press(toClick);

    const welcomeBack = await screen.findByText('Welcome Back!');
    expect(welcomeBack).toBeOnTheScreen();
  });
});
