import { Box, Text, Button, useColorMode } from 'native-base';
import * as Google from 'expo-google-app-auth';
import React from 'react';

const GoogleLogin2 = () => {
  const config = {
    androidClientId:
      '367906980347-ab30d82jprsrq4jcitdgnnojaprfa0qb.apps.googleusercontent.com',
    iosClientId:
      '367906980347-reh9g0fc5r7hp4mtb5h8d13krcej2i01.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ['public_profile', 'email', 'gender', 'location'],
  };

  const login = async () => {
    const result = await Google.logInAsync(config);
    console.log(result.user);
    // if (result.type === 'success') {
    //   // Then you can use the Google REST API
    //   let userInfoResponse = await fetch(
    //     'https://www.googleapis.com/userinfo/v2/me',
    //     {
    //       headers: { Authorization: `Bearer ${result.accessToken}` },
    //     }
    //   );
    // }
  };

  return <Button onPress={() => login()}>Google Login</Button>;
};

export default GoogleLogin2;
