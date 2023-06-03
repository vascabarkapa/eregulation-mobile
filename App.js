import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

import SmartNavigation from './navigation/SmartNavigation';

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <SmartNavigation />
    </NavigationContainer>
  );
}
