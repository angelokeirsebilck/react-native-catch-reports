import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from '../screens/main/HomeScreen';

const MainStack = ({ Stack }) => {
  return (
    <Stack.Group>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Group>
  );
};

export default MainStack;
