import { Box, Button, Text, useColorMode } from 'native-base';
import React from 'react';

const Test = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === 'dark' ? 'coolGray.800' : 'warmGray.50'}>
      <Text>Test</Text>
    </Box>
  );
};

export default Test;
