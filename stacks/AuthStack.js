import { View, Text } from 'react-native';
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';

const AuthStack = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Group>
  );
};

export default AuthStack;
