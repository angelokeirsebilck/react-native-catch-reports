import { Box, Text, Input, Center, Stack, Button } from 'native-base';
import React, { useState, useEffect } from 'react';

import Test from '../../components/Test';
import ColorModeChanger from '../../components/ColorModeChanger';
import GoogleLogin from '../../components/GoogleLogin';
import GoogleLogin2 from '../../components/GoogleLogin2';
import FacebookLogin from '../../components/FacebookLogin';

import useAuth from '../../hooks/useAuth';

import Constants from 'expo-constants';

const LoginScreen = () => {
  const { login, request, response, promptAsync } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        {/* <GoogleLogin /> */}
        <GoogleLogin2 />
        <FacebookLogin />
        <Test />
        <ColorModeChanger />
        <Text>{Constants.manifest.extra.apiUrl}</Text>
      </Stack>
    </Center>
  );
};

export default LoginScreen;
