import { Box, Button, Text } from 'native-base';

import React from 'react';

import useAuth from '../../hooks/useAuth';

import axios from '../../utils/axiosInstance';

const HomeScreen = () => {
  const { logout, user } = useAuth();

  const showCurrentUser = async () => {
    try {
      const res = await axios.get(`/users/showMe`);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
      <Button onPress={() => showCurrentUser()} colorScheme='secondary'>
        Show Current User
      </Button>
      <Button onPress={() => logout()} colorScheme='secondary'>
        Logout
      </Button>
      <Text>{user.name}</Text>
    </Box>
  );
};

export default HomeScreen;
