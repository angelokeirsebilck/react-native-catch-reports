import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/main/HomeScreen';
import LoginScreen from './screens/auth/LoginScreen';

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
