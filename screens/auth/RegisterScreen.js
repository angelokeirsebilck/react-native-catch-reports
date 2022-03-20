import { Box, Text, Input, Center, Stack, Button, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import { useNavigation } from '@react-navigation/native';

import axios from '../../utils/axiosInstance';

const RegisterScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const toast = useToast();
  const navigation = useNavigation();

  const register = async () => {
    if (email == '' || password == '') {
      setError('Please fill in email and password.');
      return;
    }

    try {
      const body = {
        email,
        password,
      };

      const res = await axios.post(`/auth/register`, body);
      setError(null);
      setEmail('');
      setPassword('');
      const { msg } = res.data;

      toast.show({
        title: 'Registration success!',
        status: 'success',
        description: msg,
      });

      navigation.navigate('Login');
    } catch (error) {
      const { msg } = error.response.data;
      setError(msg);
    }
  };

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
        <Button onPress={() => register()}>Register</Button>

        <Text color='red.400'>{error}</Text>
      </Stack>
    </Center>
  );
};

export default RegisterScreen;
