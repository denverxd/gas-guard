import {Box, Text} from '@gluestack-ui/themed';
import React from 'react';

const VersionText = () => {
  const version = '0.2.0';
  const buildNum = '202405011348';
  return (
    <Box alignItems="flex-end" pr={5}>
      <Text color="$trueGray300" fontSize={8}>
        GasGuard Mobile v{version}
      </Text>
      <Text color="$trueGray300" fontSize={8}>
        Build {buildNum}
      </Text>
    </Box>
  );
};

export default VersionText;
