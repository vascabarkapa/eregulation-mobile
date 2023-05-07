import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SmartNavigation from './navigation/SmartNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <SmartNavigation />
    </NavigationContainer>
  );
}
