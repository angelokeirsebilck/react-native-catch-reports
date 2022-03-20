import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/main/HomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';

const StackNavigator = () => {
  const { profile } = useAuth();

  return (
    <Stack.Navigator>
      {profile ? (
        <Stack.Group>
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
