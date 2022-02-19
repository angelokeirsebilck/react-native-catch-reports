import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const getColorMode = async () => {
      try {
        const value = await AsyncStorage.getItem('@colorMode');
        setColorMode(value);
        setLoadingInitial(false);
      } catch (e) {
        console.log(e);
      }
    };

    getColorMode();
  }, []);

  const memoedValue = useMemo(
    () => ({
      colorMode,
      user,
      loading,
      error,
      logout,
    }),
    [colorMode, user, loading, error]
  );

  return (
    <LoadingContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </LoadingContext.Provider>
  );
};

export default function useLoading() {
  return useContext(LoadingContext);
}
