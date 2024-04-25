import React from 'react';
import {Box, HStack, ScrollView} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text} from '@gluestack-ui/themed';
import {BellIcon} from 'lucide-react-native';
import moment from 'moment';

const sampleData = [
  {
    id: 1,
    date: '2024-04-27 09:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    date: '2024-04-27 11:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    date: '2024-04-26 12:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    date: '2024-04-26 15:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 5,
    date: '2024-04-25 20:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 6,
    date: '2024-04-25 21:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 7,
    date: '2024-04-25 23:00',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const NotificationItem = ({date, message}) => (
  <>
    <Box w="100%" bg={primaryColor} minHeight={50} p={10} borderRadius={20}>
      <HStack alignItems="center" w="100%">
        <Box mr={10} p={10} bg="white" borderRadius={999}>
          <BellIcon color={primaryColor} size={30} />
        </Box>
        <Box flex={1}>
          <Text color="white">{message}</Text>
        </Box>
      </HStack>
    </Box>
    <Box>
      <Text fontSize={12} alignSelf="flex-end">
        {moment(date).calendar()}
      </Text>
    </Box>
  </>
);

const NotificationScreen = () => {
  return (
    <ScrollView>
      <Box w="100%" p={20}>
        {sampleData.map((item, index) => {
          return (
            <Box key={item.id}>
              <NotificationItem date={item.date} message={item.message} />
              {index !== sampleData.length - 1 && <Box h={15} />}
            </Box>
          );
        })}
      </Box>
    </ScrollView>
  );
};

export default NotificationScreen;
