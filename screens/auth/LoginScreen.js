import {
  Box,
  Text,
  Input,
  Center,
  Stack,
  Button,
  Pressable,
} from 'native-base';
import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import Test from '../../components/Test';
import ColorModeChanger from '../../components/ColorModeChanger';
import useAuth from '../../hooks/useAuth';

import Constants from 'expo-constants';

const LoginScreen = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <Center safeArea>
      <Stack mt={3} space={4} w='75%' maxW='300px'>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder='Email'
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='Password'
        />
        <Button onPress={() => login(email, password)}>Login</Button>
        <Text color='red.400'>{error}</Text>
        <Test />
        <ColorModeChanger />
        <Text>{Constants.manifest.extra.apiUrl}</Text>
        <Text>{Constants.appOwnership}</Text>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text mt={3}>Did not register yet? Register!</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text mt={3}>Forgot password?</Text>
        </Pressable>
      </Stack>
    </Center>
  );
};

export default LoginScreen;
