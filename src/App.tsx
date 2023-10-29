import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {colors as ownColors, fontConfig} from './themes';
import RootStack from './navigation/root';

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    ...ownColors,
  },
  fonts: configureFonts({config: fontConfig}),
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <RootStack />
    </PaperProvider>
  );
};

export default App;
