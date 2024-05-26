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
  MailIcon,
  SmartphoneIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  getStoreData,
  handleCommonErrorRequest,
  setStoreData,
} from '../../../libraries/helpers';
import {usePutData} from '../../../zustand/store';

const UpdateProfileScreen = () => {
  const [isMount, setIsMount] = useState(false);
  const [isUpdateInvalid, setIsUpdateInvalid] = useState(false);
  const [origUserData, setOrigUserData] = useState(null);
  const [userData, setUserData] = useState({
    email: '',
    fullname: '',
    id: null,
    mobile: '',
    pin: '',
  });
  const putProfileData = usePutData();
  useFocusEffect(
    React.useCallback(() => {
      getUSerData();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      if (putProfileData.success) {
        Alert.alert('Success', 'Successfully updated profile.');
        setStoreData('user_data', JSON.stringify(userData));
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

  const getUSerData = async () => {
    let tempUser = await getStoreData('user_data');
    if (tempUser) {
      tempUser = JSON.parse(tempUser);
      setUserData({...tempUser});
      setOrigUserData({...tempUser});
    }
  };

  const onChangeField = (field, value) => {
    let temp = {...userData};

    temp[field] = value;
    setUserData(temp);
  };

  const onUpdatePress = () => {
    let tempFields = {...userData};

    for (let item of Object.values(tempFields)) {
      if (item === '') {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
    }

    const params = {...tempFields};
    console.log({params});
    putProfileData.execute('/users', params);
  };

  const isNoChangeFields = () => {
    if (
      origUserData !== null &&
      userData.fullname === origUserData.fullname &&
      userData.mobile === origUserData.mobile &&
      userData.email === origUserData.email
    ) {
      return true;
    }

    return false;
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
        {/* Full Name Input */}
        <FormControl>
          <FormControlLabel>
            <Text color="white" bold>
              Name
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}} aria-label="Name">
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={UserIcon} />
                </InputSlot>
                <InputField
                  placeholder="Full Name"
                  bg="$white"
                  value={userData.fullname}
                  onChangeText={text => onChangeField('fullname', text)}
                />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Mobile Input */}
        <FormControl>
          <FormControlLabel>
            <Text color="white" bold>
              Mobile
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={SmartphoneIcon} />
                </InputSlot>
                <InputSlot bg="$white" pb="$0.5">
                  <Text>+63</Text>
                </InputSlot>
                <InputField
                  placeholder="Mobile"
                  bg="$white"
                  maxLength={10}
                  pl="$1"
                  keyboardType="number-pad"
                  value={userData.mobile}
                  onChangeText={text => onChangeField('mobile', text)}
                />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Email Input */}
        <FormControl isInvalid={isUpdateInvalid}>
          <FormControlLabel>
            <Text color="white" bold>
              Email
            </Text>
          </FormControlLabel>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={MailIcon} />
                </InputSlot>
                <InputField
                  placeholder="Email"
                  bg="$white"
                  keyboardType="email-address"
                  value={userData.email}
                  onChangeText={text => onChangeField('email', text)}
                />
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              One of the profile details may already be taken. Please update
              your profile
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button
          action="primary"
          variant="outline"
          mt={30}
          rounded="$full"
          bg="white"
          isDisabled={putProfileData.loading || isNoChangeFields()}
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

export default UpdateProfileScreen;
