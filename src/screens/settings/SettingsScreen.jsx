import React, {useContext, useState} from 'react';
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  Text,
  HStack,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  FormControlLabel,
  ScrollView,
} from '@gluestack-ui/themed';
import {MainNavigatorContext} from '../../navigation/MainNavigator';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SmartphoneIcon,
  UserIcon,
} from 'lucide-react-native';

const SettingsScreen = () => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

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
    <ScrollView>
      <Box w="100%" py={20}>
        <Button mx={20} mb={20} onPress={() => setIsSignedIn(false)}>
          <ButtonText>Sign Out</ButtonText>
        </Button>
        {/* Profile Section */}
        <Box w={350} style={{alignSelf: 'center'}}>
          <Text size="lg" bold style={{marginBottom: 10}}>
            Profile
          </Text>
          <Box
            w="100%"
            px={30}
            pb={30}
            pt={10}
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
              <ButtonText>Update Profile</ButtonText>
            </Button>
          </Box>
        </Box>
        <Box h={30} />
        {/* PIN Section */}
        <Box w={350} style={{alignSelf: 'center'}}>
          <Text size="lg" bold style={{marginBottom: 10}}>
            PIN
          </Text>
          <Box
            w="100%"
            px={30}
            pb={30}
            pt={10}
            bgColor="$trueGray400"
            borderBottomEndRadius={50}>
            {/* Old PIN Input */}
            <FormControl>
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
                      type={showOldPin ? 'text' : 'password'}
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
            </FormControl>
            <Box h={10} />
            {/* New PIN Input */}
            <FormControl>
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
                      type={showNewPin ? 'text' : 'password'}
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
            </FormControl>
            <Box h={10} />
            {/* Confirm PIN Input */}
            <FormControl>
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
                      type={showConfirmPin ? 'text' : 'password'}
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
            </FormControl>
            <Button
              action="primary"
              variant="outline"
              mt={30}
              borderRadius={999}
              bg="white">
              <ButtonText>Update PIN</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SettingsScreen;
