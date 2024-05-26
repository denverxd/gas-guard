import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  ButtonText,
  Button,
  FormControl,
  Input,
  Center,
  HStack,
  InputField,
  InputSlot,
  InputIcon,
  useToast,
} from '@gluestack-ui/themed';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SmartphoneIcon,
  UserIcon,
} from 'lucide-react-native';
import {usePostData} from '../../zustand/store';
import {FormControlError} from '@gluestack-ui/themed';
import {FormControlErrorIcon} from '@gluestack-ui/themed';
import {FormControlErrorText} from '@gluestack-ui/themed';
import {Alert} from 'react-native';
import {ButtonSpinner} from '@gluestack-ui/themed';

const testParams = {
  fullname: 'test001',
  email: 'test001@email.com',
  mobile: '1123456789',
  pin: '123456',
  pin2: '123456',
};

const SignUpScreen = ({navigation}) => {
  const [isMount, setIsMount] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const [isMobileInvalid, setIsMobileInvalid] = useState(false);
  const [isPinError, setIsPinError] = useState(false);
  const [isPinConfirmError, setIsPinConfirmError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);

  const [fields, setFields] = useState({
    fullname: '',
    email: '',
    mobile: '',
    pin: '',
    pin2: '',
  });
  const postData = usePostData();

  useEffect(() => {
    if (isMount) {
      console.log({signUpPostData: postData});
      if (postData.success) {
        Alert.alert(
          'Success',
          'Successfully created an account. You can now sign in.',
        );
        navigation.navigate('Login');
      } else if (postData.error) {
        if (handleCommonErrorRequest(postData)) return;

        setIsSignUpError(true);
      }
    } else {
      setIsMount(true);
    }
  }, [
    postData.loading,
    postData.success,
    postData.data,
    postData.error,
    postData.errorData,
  ]);

  const onSignUpPress = () => {
    let tempFields = {...fields};
    // let tempFields = {...testParams};

    for (let item of Object.values(tempFields)) {
      if (item === '') {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
    }

    if (/^9\d{9}$/.test(tempFields.mobile) == false) {
      setIsMobileInvalid(true);
      return;
    }

    if (tempFields.pin.length !== 6) {
      setIsPinError(true);
      return;
    }
    if (tempFields.pin !== tempFields.pin2) {
      setIsPinConfirmError(true);
      return;
    }

    delete tempFields.pin2;
    const params = {...tempFields};
    postData.execute('/users/', params);
  };

  const handleShowPin = () => {
    setShowPin(showPin => {
      return !showPin;
    });
  };

  const handleShowConfirmPin = () => {
    setShowConfirmPin(showConfirmPin => {
      return !showConfirmPin;
    });
  };

  const onChangeField = (field, value) => {
    let temp = {...fields};
    if (field == 'fullname' || field == 'mobile' || field == 'email') {
      setIsSignUpError(false);
    }

    if (field == 'pin' || field == 'pin2') {
      setIsPinConfirmError(false);
    }

    if (field == 'pin') {
      setIsPinError(false);
    }

    if (field == 'mobile') {
      setIsMobileInvalid(false);
    }

    temp[field] = value;
    setFields(temp);
  };
  return (
    <Box w="100%" h="100%" style={{paddingTop: 20}}>
      {/* Profile Section */}
      <Box w={300} style={{alignSelf: 'center'}}>
        <Text size="lg" bold style={{marginBottom: 10}}>
          Profile
        </Text>
        {/* Full Name Input */}
        <FormControl>
          <HStack style={{alignItems: 'center'}}>
            <Input style={{flex: 1}}>
              <InputSlot px="$3" bg="$white">
                <InputIcon as={UserIcon} />
              </InputSlot>
              <InputField
                placeholder="Full Name"
                bg="$white"
                onChangeText={text => onChangeField('fullname', text)}
              />
            </Input>
          </HStack>
        </FormControl>
        <Box h={10} />
        {/* Mobile Input */}
        <FormControl isInvalid={isMobileInvalid}>
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
                  pl="$1"
                  keyboardType="number-pad"
                  maxLength={10}
                  onChangeText={text => onChangeField('mobile', text)}
                />
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Please provide a valid 10 digit mobile number
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box h={10} />
        {/* Email Input */}
        <FormControl isInvalid={isSignUpError}>
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
      </Box>
      <Box h={30} />
      {/* PIN Section */}
      <Box w={300} style={{alignSelf: 'center'}}>
        <Text size="lg" bold style={{marginBottom: 10}}>
          PIN
        </Text>
        {/* PIN Input */}
        <FormControl isInvalid={isPinError}>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  placeholder="PIN (6 digit)"
                  bg="$white"
                  keyboardType="number-pad"
                  maxLength={6}
                  type={showPin ? 'text' : 'password'}
                  onChangeText={text => onChangeField('pin', text)}
                />
                <InputSlot px="$3" onPress={handleShowPin} bg="$white">
                  <InputIcon
                    as={showPin ? EyeIcon : EyeOffIcon}
                    color="$darkBlue500"
                  />
                </InputSlot>
              </Input>
            </HStack>
          </Center>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>PIN must be 6 digits</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box h={10} />
        {/* Confirm PIN Input */}
        <FormControl isInvalid={isPinConfirmError}>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={LockIcon} />
                </InputSlot>
                <InputField
                  placeholder="Confirm PIN (6 digit)"
                  bg="$white"
                  keyboardType="number-pad"
                  maxLength={6}
                  type={showConfirmPin ? 'text' : 'password'}
                  onChangeText={text => onChangeField('pin2', text)}
                />
                <InputSlot px="$3" onPress={handleShowConfirmPin} bg="$white">
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
      </Box>

      {/* Sign Up Button */}
      <Box
        w={300}
        style={{
          borderWidth: 0,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 25,
        }}>
        <Button
          action="primary"
          style={{borderRadius: 999}}
          isDisabled={postData.loading}
          onPress={() => onSignUpPress()}>
          {postData.loading ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>Sign Up</ButtonText>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
