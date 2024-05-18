import React, {useState} from 'react';
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
} from '@gluestack-ui/themed';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SmartphoneIcon,
  UserIcon,
} from 'lucide-react-native';
import {usePostData} from '../../zustand/store';

const SignUpScreen = () => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [fields, setFields] = useState({
    fullname: '',
    email: '',
    mobile: '',
    pin: '',
    pin2: '',
  });
  const postData = usePostData();

  const testSignUp = () => {
    const params = {
      fullname: 'test001',
      email: 'test001@email.com',
      mobile: '9123456789',
      pin: '123456',
    };

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
    temp[field] = value;
    console.log({temp});
    setFields(temp);
  };
  return (
    <Box w="100%" h="100%" style={{paddingTop: 20}}>
      {console.log({
        loading: postData.loading,
        data: postData.data,
        error: postData.error,
      })}
      {/* Profile Section */}
      <Box w={300} style={{alignSelf: 'center'}}>
        <Text size="lg" bold style={{marginBottom: 10}}>
          Profile
        </Text>
        {/* Full Name Input */}
        <FormControl>
          <Center>
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
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Mobile Input */}
        <FormControl>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <Input style={{flex: 1}}>
                <InputSlot px="$3" bg="$white">
                  <InputIcon as={SmartphoneIcon} />
                </InputSlot>
                <InputField
                  placeholder="Mobile"
                  bg="$white"
                  keyboardType="number-pad"
                  onChangeText={text => onChangeField('mobile', text)}
                />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Email Input */}
        <FormControl>
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
        </FormControl>
      </Box>
      <Box h={30} />
      {/* PIN Section */}
      <Box w={300} style={{alignSelf: 'center'}}>
        <Text size="lg" bold style={{marginBottom: 10}}>
          PIN
        </Text>
        {/* PIN Input */}
        <FormControl>
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
        </FormControl>
        <Box h={10} />
        {/* Confirm PIN Input */}
        <FormControl>
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
          onPress={() => testSignUp()}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
