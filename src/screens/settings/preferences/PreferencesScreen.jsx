import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Switch,
  Text,
} from '@gluestack-ui/themed';
import {useFocusEffect} from '@react-navigation/native';
import {
  CircleAlertIcon,
  MailIcon,
  SmartphoneIcon,
  TimerIcon,
  TriangleAlertIcon,
  UserIcon,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {getStoreData, setStoreData} from '../../../libraries/helpers';
import {usePutData} from '../../../zustand/store';

const PreferencesScreen = () => {
  const [isMount, setIsMount] = useState(false);
  const [preferences, setPreferences] = useState({
    danger_threshold: 0,
    enable_sms: false,
    history_interval: 0,
    id: 1,
    warning_threshold: 0,
  });

  const prefPutData = usePutData();

  useFocusEffect(
    React.useCallback(() => {
      getPreferences();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      if (prefPutData.success) {
        Alert.alert('Success', 'Successfully updated preferences.');
        setStoreData('preferences_data', JSON.stringify(preferences));
      } else if (prefPutData.error) {
        if (handleCommonErrorRequest(prefPutData)) return;

        console.log('Error updating preferences');
      }
    } else {
      setIsMount(true);
    }
  }, [
    prefPutData.loading,
    prefPutData.success,
    prefPutData.data,
    prefPutData.error,
    prefPutData.errorData,
  ]);

  const getPreferences = async () => {
    let tempPref = await getStoreData('preferences_data');
    if (tempPref) {
      tempPref = JSON.parse(tempPref);
      setPreferences({...tempPref});
    }
  };

  const onChangeField = (field, value) => {
    let tempFields = {...preferences};

    tempFields[field] = value;
    setPreferences(tempFields);
  };

  const onSavePress = () => {
    let tempFields = {...preferences};

    for (let item of Object.values(tempFields)) {
      if (item === '') {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
    }

    tempFields.danger_threshold = parseFloat(preferences.danger_threshold);
    tempFields.history_interval = parseFloat(preferences.history_interval);
    tempFields.warning_threshold = parseFloat(preferences.warning_threshold);

    if (tempFields.warning_threshold >= tempFields.danger_threshold) {
      Alert.alert(
        'Error',
        'Warning threshold must be less than Danger threshold',
      );
      return;
    }

    const params = {...tempFields};
    setPreferences(params);
    prefPutData.execute('/preferences', params);
  };

  return (
    <ScrollView>
      <Box w="$full" style={{alignSelf: 'center'}}>
        <Box
          px={20}
          pb={30}
          pt={10}
          mt={20}
          mx={20}
          bgColor="$trueGray400"
          borderBottomEndRadius={50}>
          {/* History Interval Input */}
          <FormControl>
            <FormControlLabel>
              <Text color="white" bold>
                History Interval
              </Text>
            </FormControlLabel>
            <Center>
              <Input style={{flex: 1}} aria-label="Interval">
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={TimerIcon} />
                </InputSlot>
                <InputField
                  placeholder="Interval"
                  bg="$white"
                  keyboardType="number-pad"
                  onChangeText={value =>
                    onChangeField('history_interval', value)
                  }
                  value={preferences.history_interval.toString()}
                />
                <InputSlot px="$3" bg="$white">
                  <Text>hr(s)</Text>
                </InputSlot>
              </Input>
            </Center>
          </FormControl>
          <Box h={10} />
          {/* Warning Threshold Input */}
          <FormControl>
            <FormControlLabel>
              <Text color="white" bold>
                Warning Threshold
              </Text>
            </FormControlLabel>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}}>
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={CircleAlertIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Warning"
                    bg="$white"
                    keyboardType="number-pad"
                    onChangeText={value =>
                      onChangeField('warning_threshold', value)
                    }
                    value={preferences.warning_threshold.toString()}
                  />
                  <InputSlot px="$3" bg="$white">
                    <Text>ppm</Text>
                  </InputSlot>
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <Box h={10} />
          {/* Danger Threshold Input */}
          <FormControl>
            <FormControlLabel>
              <Text color="white" bold>
                Danger Threshold
              </Text>
            </FormControlLabel>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}}>
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={TriangleAlertIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Danger"
                    bg="$white"
                    keyboardType="number-pad"
                    onChangeText={value =>
                      onChangeField('danger_threshold', value)
                    }
                    value={preferences.danger_threshold.toString()}
                  />
                  <InputSlot px="$3" bg="$white">
                    <Text>ppm</Text>
                  </InputSlot>
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <HStack mt={20} space="md" alignItems="center">
            <Switch
              defaultValue={true}
              size="md"
              value={preferences.enable_sms}
              onToggle={value => onChangeField('enable_sms', value)}
            />
            <Text size="lg" color="white" bold>
              Enable SMS
            </Text>
          </HStack>
          <Button
            action="primary"
            variant="outline"
            mt={30}
            rounded="$full"
            bg="white"
            isDisabled={prefPutData.loading}
            onPress={onSavePress}>
            {prefPutData.loading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>Save</ButtonText>
            )}
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PreferencesScreen;
