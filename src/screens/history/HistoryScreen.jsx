import {
  Box,
  HStack,
  RefreshControl,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {primaryColor} from '../../constant/colors';
import {handleCommonErrorRequest} from '../../libraries/helpers';
import {Alert} from 'react-native';
import {useGetData} from '../../zustand/store';
import {useFocusEffect} from '@react-navigation/native';

const HistoryItem = ({gasValue, datetime, statusType}) => {
  const handleStatusColor = type => {
    let color = 'green';
    let status = 'Safe';
    if (type == 'DANGER') {
      color = 'red';
      status = 'Danger';
    } else if (type == 'WARNING') {
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
          backgroundColor={handleStatusColor(statusType).color}
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
              color={handleStatusColor(statusType).color}>
              {gasValue}
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
  const [isMount, setIsMount] = useState(false);
  const historyGetData = useGetData();

  useFocusEffect(
    React.useCallback(() => {
      getHistory();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      console.log({historyGetData});
      if (historyGetData.success) {
        console.log('History successfully loaded', {
          historyGetData: historyGetData.data,
        });
      } else if (historyGetData.error) {
        if (handleCommonErrorRequest(historyGetData)) return;

        Alert.alert('Error', 'Something went wrong while loading history');
      }
    } else {
      setIsMount(true);
    }
  }, [
    historyGetData.loading,
    historyGetData.success,
    historyGetData.data,
    historyGetData.error,
    historyGetData.errorData,
  ]);

  const getHistory = () => {
    historyGetData.execute('/histories');
  };

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

      <ScrollView
        w="$full"
        px={20}
        contentContainerStyle={{paddingBottom: 30}}
        refreshControl={
          <RefreshControl
            refreshing={historyGetData.loading}
            onRefresh={getHistory}
          />
        }>
        {historyGetData.data?.length > 0 ? (
          historyGetData.data.map((item, index) => {
            return (
              <Box key={item.id}>
                <HistoryItem
                  gasValue={item.ppm}
                  datetime={item.timestamp}
                  statusType={item.status_type}
                />
                {index !== historyGetData.data.length - 1 && <Box h={15} />}
              </Box>
            );
          })
        ) : (
          <Box justifyContent="center" alignItems="center">
            <Text>No notifications yet</Text>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default HistoryScreen;
