import { Box, Text, Button, useColorMode } from 'native-base';
import * as Google from 'expo-google-app-auth';
import React from 'react';
import useAuth from '../hooks/useAuth';
import Constants from 'expo-constants';

const isNative = Constants.appOwnership !== 'expo' && Platform.OS !== 'web';

const GoogleLogin2 = () => {
  const config = {
    androidClientId:
      '367906980347-ab30d82jprsrq4jcitdgnnojaprfa0qb.apps.googleusercontent.com',
    androidStandaloneAppClientId:
      '367906980347-ia22vh64604o2et7brmj7tf8bgbphg16.apps.googleusercontent.com',
    iosClientId:
      '367906980347-reh9g0fc5r7hp4mtb5h8d13krcej2i01.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ['public_profile', 'email', 'gender', 'location'],
  };

  const { googleLogin } = useAuth();

  const login = async () => {
    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
      googleLogin(accessToken);
    }
  };

  return <Button onPress={() => login()}>Google Login</Button>;
};

export default GoogleLogin2;
