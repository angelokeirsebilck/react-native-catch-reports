import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';

import NativeBaseParent from './components/native-base/NativeBaseParent';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NativeBaseParent />
      </AuthProvider>
    </NavigationContainer>
  );
}
