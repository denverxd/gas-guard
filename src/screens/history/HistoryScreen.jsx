import {Box, HStack, ScrollView, Text} from '@gluestack-ui/themed';
import moment from 'moment';
import React from 'react';
import {primaryColor} from '../../constant/colors';

const HistoryScreen = () => {
  return (
    <Box py={20} pr={5} w="100%" borderWidth={0} borderColor="red">
      <ScrollView w="$full" px={20}>
        <Box w="$full" pb={10}>
          <HStack w="$full">
            <Box
              h="100%"
              w={5}
              // marginTop={10}
              backgroundColor="red"
              // position="absolute"
              borderTopLeftRadius={20}
              borderBottomLeftRadius={20}
            />
            <Box
              h={75}
              flex={1}
              // borderWidth={1}
              p={20}
              borderTopRightRadius={20}
              borderBottomRightRadius={20}
              justifyContent="center"
              medium
              backgroundColor="white">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize={30} fontWeight="$medium" color="red">
                  200 ppm
                </Text>
                <Box>
                  <Text textAlign="right" fontSize={20} color={primaryColor}>
                    {moment('2024-05-18 13:00').format('hh:mm A')}
                  </Text>
                  <Text textAlign="right" fontSize={14}>
                    {moment('2024-0-18 13:00').format('ll')}
                  </Text>
                </Box>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HistoryScreen;
