import { Box, Text, Button, useColorMode } from 'native-base';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

const ColorModeChanger = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const storeColorMode = async (colorMode) => {
    try {
      await SecureStore.setItemAsync('colorMode', colorMode);
    } catch (e) {
      // saving error
    }
  };

  const changeColorMode = () => {
    const color = colorMode;
    color == 'light' ? storeColorMode('dark') : storeColorMode('light');
    toggleColorMode();
  };

  return (
    <Box>
      <Button onPress={() => changeColorMode()}>ColorModeChanger</Button>
    </Box>
  );
};

export default ColorModeChanger;
