import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
} from '@gluestack-ui/themed';
import {MailIcon, SmartphoneIcon, UserIcon} from 'lucide-react-native';
import React from 'react';

const UpdateProfileScreen = () => {
  return (
    <Box w={350} style={{alignSelf: 'center'}}>
      <Box
        w="100%"
        px={30}
        pb={30}
        pt={10}
        mt={30}
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
                <InputField placeholder="Full Name" bg="$white" />
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
                <InputField placeholder="Mobile" bg="$white" />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Email Input */}
        <FormControl>
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
                <InputField placeholder="Email" bg="$white" />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Button
          action="primary"
          variant="outline"
          mt={30}
          borderRadius={999}
          bg="white">
          <ButtonText>Update</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfileScreen;
