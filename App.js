import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import SmartNavigation from './navigation/SmartNavigation';
import { GlobalProvider } from './contexts/GlobalContext';

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer theme={DarkTheme}>
        <SmartNavigation />
      </NavigationContainer>
    </GlobalProvider>
  );
}
