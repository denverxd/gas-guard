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
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {
  CircleAlertIcon,
  MailIcon,
  SmartphoneIcon,
  TimerIcon,
  TriangleAlertIcon,
  UserIcon,
} from 'lucide-react-native';
import React from 'react';

const PreferencesScreen = () => {
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
                  />
                  <InputSlot px="$3" bg="$white">
                    <Text>ppm</Text>
                  </InputSlot>
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <Box h={10} />
          {/* Email Input */}
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
                  />
                  <InputSlot px="$3" bg="$white">
                    <Text>ppm</Text>
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
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PreferencesScreen;
