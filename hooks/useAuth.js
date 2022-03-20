import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';

// import axios from 'axios';

import axios from '../utils/axiosInstance';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const getColorMode = async () => {
      try {
        const colorMode = await SecureStore.getItemAsync('colorMode');
        setColorMode(colorMode);
        const token = await SecureStore.getItemAsync('token');

        if (token) {
          getCurrentProfile();
        }

        setLoadingInitial(false);
      } catch (e) {
        console.log(e);
      }
    };

    getColorMode();
  }, []);

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('profile');
      setProfile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    const body = {
      email,
      password,
    };

    try {
      const res = await axios.post(`/auth/login`, body);

      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync(
        'profile',
        JSON.stringify(res.data.profile)
      );
      setProfile(res.data.profile);
    } catch (error) {
      const { msg } = error.response.data;
      setError(msg);
      console.log(error);
    }
  };

  const fbLogin = async (token) => {
    const body = {
      accessToken: token,
    };

    try {
      const res = await axios.post(`/auth/login/facebook`, body);

      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync(
        'profile',
        JSON.stringify(res.data.profile)
      );
      setProfile(res.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async (token) => {
    const body = {
      accessToken: token,
    };

    try {
      const res = await axios.post(`/auth/login/google`, body);

      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync(
        'profile',
        JSON.stringify(res.data.profile)
      );
      setProfile(res.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentProfile = async () => {
    try {
      const res = await axios.get(`/users/showMe`);

      await SecureStore.setItemAsync(
        'profile',
        JSON.stringify(res.data.profile)
      );
      setProfile(res.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      profile,
      loading,
      error,
      logout,
      login,
      fbLogin,
      googleLogin,
      colorMode,
    }),
    [profile, loading, error, colorMode]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function uesAuth() {
  return useContext(AuthContext);
}
