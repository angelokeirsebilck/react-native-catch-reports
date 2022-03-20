import * as React from 'react';
import { Button } from 'react-native';
import useAuth from '../hooks/useAuth';
import * as Facebook from 'expo-facebook';

export default function App() {
  const { fbLogin } = useAuth();

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '634959567771611',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log({ message });
      // alert(`Facebook Login Error: ${message}`);
    }
  }

  React.useEffect(() => {}, []);

  return (
    <Button
      title='Facebook login2'
      onPress={() => {
        logIn();
      }}
    />
  );
}
