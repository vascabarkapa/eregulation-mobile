import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import SmartNavigation from './navigation/SmartNavigation';
import { GlobalProvider } from './contexts/GlobalContext';

export default function App() {
  return (
    <RootSiblingParent>
      <GlobalProvider>
        <NavigationContainer theme={DarkTheme}>
          <SmartNavigation />
        </NavigationContainer>
      </GlobalProvider>
    </RootSiblingParent>
  );
}
