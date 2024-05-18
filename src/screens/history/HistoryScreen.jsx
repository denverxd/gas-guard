import {Box, HStack, ScrollView, Text} from '@gluestack-ui/themed';
import moment from 'moment';
import React from 'react';
import {primaryColor} from '../../constant/colors';

const HistoryItem = ({gasValue, datetime}) => {
  const handleStatusColor = value => {
    let color = 'green';
    let status = 'Safe';
    if (value > 650) {
      color = 'red';
      status = 'Danger';
    } else if (value > 350 && value <= 650) {
      color = 'orange';
      status = 'Warning';
    } else {
    }

    return {color, status};
  };
  return (
    <Box w="$full" pb={10}>
      <HStack w="$full">
        <Box
          h="100%"
          w={5}
          // marginTop={10}
          backgroundColor={handleStatusColor(gasValue).color}
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
            <Text
              fontSize={30}
              fontWeight="$medium"
              color={handleStatusColor(gasValue).color}>
              {gasValue} ppm
            </Text>
            <Box>
              <Text textAlign="right" fontSize={20} color={primaryColor}>
                {moment(datetime).format('hh:mm A')}
              </Text>
              <Text textAlign="right" fontSize={14}>
                {moment(datetime).format('ll')}
              </Text>
            </Box>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

const HistoryScreen = () => {
  return (
    <Box py={20} pr={5} w="100%" borderWidth={0} borderColor="red">
      <HStack justifyContent="space-evenly" mb={20}>
        <Box alignItems="center">
          <Box w={75} h={3} backgroundColor="green" />
          <Text>Safe</Text>
        </Box>
        <Box alignItems="center">
          <Box w={75} h={3} backgroundColor="orange" />
          <Text>Warning</Text>
        </Box>
        <Box alignItems="center">
          <Box w={75} h={3} backgroundColor="red" />
          <Text>Danger</Text>
        </Box>
      </HStack>

      <ScrollView w="$full" px={20} contentContainerStyle={{paddingBottom: 30}}>
        <HistoryItem gasValue={100} datetime="2024-05-18 06:00" />
        <HistoryItem gasValue={200} datetime="2024-05-18 07:00" />
        <HistoryItem gasValue={300} datetime="2024-05-18 08:00" />
        <HistoryItem gasValue={400} datetime="2024-05-18 09:00" />
        <HistoryItem gasValue={500} datetime="2024-05-18 10:00" />
        <HistoryItem gasValue={600} datetime="2024-05-18 11:00" />
        <HistoryItem gasValue={700} datetime="2024-05-18 12:00" />
        <HistoryItem gasValue={750} datetime="2024-05-18 13:00" />
        <HistoryItem gasValue={800} datetime="2024-05-18 14:00" />
        <HistoryItem gasValue={850} datetime="2024-05-18 15:00" />
        <HistoryItem gasValue={900} datetime="2024-05-18 16:00" />
      </ScrollView>
    </Box>
  );
};

export default HistoryScreen;
