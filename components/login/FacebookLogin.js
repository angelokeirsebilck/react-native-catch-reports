import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType, makeRedirectUri } from 'expo-auth-session';
import { Button } from 'react-native';
import useAuth from '../../hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '634959567771611',
    responseType: ResponseType.Token,
  });

  const { fbLogin } = useAuth();

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;

      // Server facebook login call with access token
      console.log('response success');
      fbLogin(access_token);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title='Facebook login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
