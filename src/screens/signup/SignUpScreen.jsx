import React from 'react';
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
} from '@gluestack-ui/themed';
import RNIcon from 'react-native-vector-icons/AntDesign';

const SignUpScreen = () => {
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
              <RNIcon name="user" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
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
              <RNIcon name="mobile1" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
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
              <RNIcon name="mail" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
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
        {/* Full Name Input */}
        <FormControl>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <RNIcon name="lock1" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
                <InputField placeholder="PIN (6 digit)" bg="$white" />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Mobile Input */}
        <FormControl>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <RNIcon name="lock1" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
                <InputField placeholder="Confirm PIN (6 digit)" bg="$white" />
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
