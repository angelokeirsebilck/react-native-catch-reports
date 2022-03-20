import { Box, Button, Image, Text } from 'native-base';

import React, { useState } from 'react';

import useAuth from '../../hooks/useAuth';

import axios from '../../utils/axiosInstance';

import Constants from 'expo-constants';

const HomeScreen = () => {
  const { logout, profile } = useAuth();

  const showCurrentUser = async () => {
    try {
      const res = await axios.get(`/users/showMe`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Text>{Constants.appOwnership}</Text>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>

      {/* <Button onPress={() => showCurrentUser()} colorScheme='secondary'>
        Show Current User
      </Button> */}
      <Button onPress={() => logout()} colorScheme='secondary'>
        Logout
      </Button>
      <Text>{profile.email}</Text>
      {profile.firstName && <Text>{profile.firstName}</Text>}
      {profile.pictureURL && (
        <Image
          source={{ uri: profile.pictureURL }}
          alt='Profile Pic'
          borderRadius={100}
          size='sm'
        />
      )}
    </Box>
  );
};

export default HomeScreen;
