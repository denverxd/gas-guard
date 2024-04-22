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

const SignUpScreen = () => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

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
  return (
    <Box w="100%" h="100%" style={{paddingTop: 20}}>
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
                <InputField placeholder="Full Name" bg="$white" />
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
                <InputField placeholder="Mobile" bg="$white" />
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
                <InputField placeholder="Email" bg="$white" />
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
                  type={showPin ? 'text' : 'password'}
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
                  type={showConfirmPin ? 'text' : 'password'}
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
        <Button action="primary" style={{borderRadius: 999}}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
