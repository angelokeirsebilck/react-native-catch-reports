import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '634959567771611',
    responseType: ResponseType.Token,
  });
  const [token, setToken] = React.useState(null);

  const fetchUser = async (token) => {
    try {
      console.log('fetch user', token);
      const data = await fetch(
        `https://graph.facebook.com/me?fields=email,name&access_token=${token}`
      );
      const result = await data.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      fetchUser(access_token);
      console.log('response success');
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
