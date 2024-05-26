import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
} from '@gluestack-ui/themed';
import {useFocusEffect} from '@react-navigation/native';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from 'lucide-react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  getStoreData,
  handleCommonErrorRequest,
  setStoreData,
} from '../../../libraries/helpers';
import {usePutData} from '../../../zustand/store';
import {MainNavigatorContext} from '../../../navigation/MainNavigator';

const UpdatePinScreen = () => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const [isMount, setIsMount] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    fullname: '',
    id: null,
    mobile: '',
    pin: '',
  });
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isOldPinInvalid, setIsOldPinInvalid] = useState(false);
  const [isNewPinInvalid, setIsNewPinInvalid] = useState(false);
  const [isConfirmPinInvalid, setIsConfirmPinInvalid] = useState(false);
  const putProfileData = usePutData();

  useFocusEffect(
    React.useCallback(() => {
      getUSerData();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      if (putProfileData.success) {
        Alert.alert('Success', 'Successfully updated PIN. Please login again.');
        setStoreData('user_data', null);
        setIsSignedIn(false);
      } else if (putProfileData.error) {
        if (handleCommonErrorRequest(putProfileData)) return;

        setIsUpdateInvalid(true);
      }
    } else {
      setIsMount(true);
    }
  }, [
    putProfileData.loading,
    putProfileData.success,
    putProfileData.data,
    putProfileData.error,
    putProfileData.errorData,
  ]);

  useEffect(() => {
    setIsOldPinInvalid(false);
    setIsNewPinInvalid(false);
    setIsConfirmPinInvalid(false);
  }, [oldPin, newPin, confirmPin]);

  const getUSerData = async () => {
    let tempUser = await getStoreData('user_data');
    if (tempUser) {
      tempUser = JSON.parse(tempUser);
      setUserData({...tempUser});
    }
  };

  const onUpdatePress = () => {
    let tempFields = {...userData};

    for (let item of Object.values(tempFields)) {
      if (item === '') {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
    }

    if (userData.pin !== oldPin) {
      setIsOldPinInvalid(true);
      return;
    }

    if (newPin?.length !== 6) {
      setIsNewPinInvalid(true);
      return;
    }

    if (newPin !== confirmPin) {
      setIsConfirmPinInvalid(true);
      return;
    }

    tempFields.pin = newPin;

    const params = {...tempFields};
    putProfileData.execute('/users', params);
  };

  const handleShowPin = type => {
    switch (type) {
      case 'old':
        setShowOldPin(showOldPin => {
          return !showOldPin;
        });
        break;

      case 'new':
        setShowNewPin(showNewPin => {
          return !showNewPin;
        });
        break;

      case 'confirm':
        setShowConfirmPin(showConfirmPin => {
          return !showConfirmPin;
        });
        break;

      default:
        break;
    }
  };
  return (
    <Box w="$full" style={{alignSelf: 'center'}}>
      <Box
        px={20}
        pb={30}
        pt={10}
        mt={20}
        mx={20}
        bgColor="$trueGray400"
        borderBottomEndRadius={50}>
        {/* Old PIN Input */}
        <FormControl isInvalid={isOldPinInvalid}>
          <FormControlLabel>
            <Text color="white" bold>
              Old PIN
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  placeholder="PIN (6 digit)"
                  bg="$white"
                  maxLength={6}
                  type={showOldPin ? 'text' : 'password'}
                  keyboardType="number-pad"
                  onChangeText={text => setOldPin(text)}
                />
                <InputSlot
                  px="$3"
                  onPress={() => handleShowPin('old')}
                  bg="$white">
                  <InputIcon
                    as={showOldPin ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>Incorrect Pin</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box h={10} />
        {/* New PIN Input */}
        <FormControl isInvalid={isNewPinInvalid}>
          <FormControlLabel>
            <Text color="white" bold>
              New PIN
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  placeholder="PIN (6 digit)"
                  bg="$white"
                  maxLength={6}
                  type={showNewPin ? 'text' : 'password'}
                  keyboardType="number-pad"
                  onChangeText={text => setNewPin(text)}
                />
                <InputSlot
                  px="$3"
                  onPress={() => handleShowPin('new')}
                  bg="$white">
                  <InputIcon
                    as={showNewPin ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>Invalid new PIN</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box h={10} />
        {/* Confirm PIN Input */}
        <FormControl isInvalid={isConfirmPinInvalid}>
          <FormControlLabel>
            <Text color="white" bold>
              Confirm PIN
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  placeholder="Confirm PIN (6 digit)"
                  bg="$white"
                  maxLength={6}
                  type={showConfirmPin ? 'text' : 'password'}
                  keyboardType="number-pad"
                  onChangeText={text => setConfirmPin(text)}
                />
                <InputSlot
                  px="$3"
                  onPress={() => handleShowPin('confirm')}
                  bg="$white">
                  <InputIcon
                    as={showConfirmPin ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>PIN doesn't match</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          action="primary"
          variant="outline"
          mt={30}
          rounded="$full"
          isDisabled={putProfileData.loading}
          bg="white"
          onPress={onUpdatePress}>
          {putProfileData.loading ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>Update</ButtonText>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePinScreen;
