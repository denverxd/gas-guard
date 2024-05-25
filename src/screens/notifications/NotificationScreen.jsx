import React, {useEffect, useState} from 'react';
import {Box, HStack, RefreshControl, ScrollView} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text} from '@gluestack-ui/themed';
import {BellIcon} from 'lucide-react-native';
import moment from 'moment';
import {useGetData} from '../../zustand/store';
import {handleCommonErrorRequest} from '../../libraries/helpers';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const NotificationItem = ({date, message}) => {
  let color = primaryColor;
  if (message?.includes('Warning')) {
    color = 'orange';
  } else if (message?.includes('Danger')) {
    color = 'red';
  }
  return (
    <>
      <Box w="100%" bg={primaryColor} minHeight={50} p={10} borderRadius={20}>
        <HStack alignItems="center" w="100%">
          <Box mr={10} p={10} bg={color} borderRadius={999}>
            <BellIcon color="white" size={30} />
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
};

const NotificationScreen = () => {
  const [isMount, setIsMount] = useState(false);
  const notifGetData = useGetData();

  useFocusEffect(
    React.useCallback(() => {
      getNotifs();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      if (notifGetData.success) {
        console.log('Notification successfully loaded');
      } else if (notifGetData.error) {
        if (handleCommonErrorRequest(notifGetData)) return;

        Alert.alert(
          'Error',
          'Something went wrong while loading notifications',
        );
      }
    } else {
      setIsMount(true);
    }
  }, [
    notifGetData.loading,
    notifGetData.success,
    notifGetData.data,
    notifGetData.error,
    notifGetData.errorData,
  ]);

  const getNotifs = () => {
    notifGetData.execute('/notifications');
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={notifGetData.loading}
          onRefresh={getNotifs}
        />
      }>
      <Box w="100%" p={20}>
        {notifGetData.data?.length > 0 ? (
          notifGetData.data.map((item, index) => {
            return (
              <Box key={item.id}>
                <NotificationItem
                  date={item.timestamp}
                  message={item.notif_message}
                />
                {index !== notifGetData.data.length - 1 && <Box h={15} />}
              </Box>
            );
          })
        ) : (
          <Box justifyContent="center" alignItems="center">
            <Text>No notifications yet</Text>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default NotificationScreen;
