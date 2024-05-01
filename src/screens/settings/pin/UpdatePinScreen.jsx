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
import {EyeIcon, EyeOffIcon, LockIcon} from 'lucide-react-native';
import React, {useState} from 'react';

const UpdatePinScreen = () => {
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
                  keyboardType="number-pad"
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
                  keyboardType="number-pad"
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
                  keyboardType="number-pad"
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
          rounded="$full"
          bg="white">
          <ButtonText>Update</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePinScreen;
