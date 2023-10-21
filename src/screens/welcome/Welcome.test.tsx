import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../../navigation/auth';

describe('SignInScreen', () => {
  it('should show the Welcome text', () => {
    const component = (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );

    render(component);

    expect(screen.getByText('Manage your Task with')).toBeOnTheScreen();
    expect(screen.getByText('DayTask')).toBeOnTheScreen();
  });

  it("should navigate to login screen when pressing let's start", () => {
    const component = (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );

    render(component);

    fireEvent.press(screen.getByText("Let's Start"));
    expect(screen.getByText('Login')).toBeOnTheScreen();
  });
});
