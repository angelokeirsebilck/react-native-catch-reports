import { Box, Text, Input, Center, Stack, Button, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import { useNavigation } from '@react-navigation/native';

import axios from '../../utils/axiosInstance';

const ForgotPasswordScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const toast = useToast();
  const navigation = useNavigation();

  const register = async () => {
    if (email == '') {
      setError('Please fill in email.');
      return;
    }

    try {
      const body = {
        email,
      };

      const res = await axios.post(`/auth/forgot-password`, body);
      setError(null);
      setEmail('');
      const { msg } = res.data;

      toast.show({
        title: 'E-mail send.',
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
        <Button onPress={() => register()}>Submit</Button>

        <Text color='red.400'>{error}</Text>
      </Stack>
    </Center>
  );
};

export default ForgotPasswordScreen;
