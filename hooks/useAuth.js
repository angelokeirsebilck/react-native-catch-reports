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
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const getColorMode = async () => {
      try {
        const colorMode = await SecureStore.getItemAsync('colorMode');
        setColorMode(colorMode);

        const user = await SecureStore.getItemAsync('user');
        setUser(JSON.parse(user));

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
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    console.log(process.env.API_URL);

    const body = {
      email,
      password,
    };

    try {
      const res = await axios.post(`/auth/login`, body);

      await SecureStore.setItemAsync('token', res.data.token);
      await SecureStore.setItemAsync('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      login,
      colorMode,
    }),
    [user, loading, error, colorMode]
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
