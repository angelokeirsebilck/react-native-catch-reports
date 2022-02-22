import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '367906980347-a7693kpgee7h5a19g0tabpjhs46fiece.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId:
      '367906980347-ab30d82jprsrq4jcitdgnnojaprfa0qb.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  const [userInfo, setUserInfo] = React.useState();

  const getUserData = async (accessToken) => {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      console.log(data);
    });
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      getUserData(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title='Login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
