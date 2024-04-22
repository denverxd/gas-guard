import React, {useContext, useState} from 'react';
import {MainNavigatorContext} from '../../navigation/MainNavigator';
import {
  Box,
  Button,
  ButtonText,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  InputField,
  Text,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Image,
  InputSlot,
  InputIcon,
  FormControlErrorText,
} from '@gluestack-ui/themed';
import {appImages} from '../../images';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  SmartphoneIcon,
} from 'lucide-react-native';
import {FormControlErrorIcon} from '@gluestack-ui/themed';
import {FormControlError} from '@gluestack-ui/themed';

const LoginScreen = ({navigation}) => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);

  const [showPin, setShowPin] = useState(false);
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);
  const [loginFields, setLoginFields] = useState({
    mobile: '',
    pin: '',
  });

  const handleShowPin = () => {
    setShowPin(showPin => {
      return !showPin;
    });
  };

  const onChangeField = (field, value) => {
    let tempFields = {...loginFields};
    tempFields[field] = value;
    setLoginFields(tempFields);
  };

  const onSignInPress = () => {
    if (loginFields.mobile == '09123456789' && loginFields.pin == '123456') {
      setIsSignedIn(true);
      setIsLoginInvalid(false);
    } else {
      console.log('Invalid Credentials');
      setIsLoginInvalid(true);
    }
  };

  return (
    <Box w="100%" h="100%">
      {/* Logo */}
      <Image
        source={appImages.mainLogo}
        h={150}
        w={150}
        style={{alignSelf: 'center', marginTop: '30%'}}
      />
      <Box style={{alignItems: 'center', marginTop: -20}}>
        <Text size="3xl" style={{fontWeight: '800'}}>
          GasGuard
        </Text>
      </Box>
      <Box style={{marginBottom: '20%'}} />
      {/* Form */}
      <Box w={300} style={{borderWidth: 0, alignSelf: 'center'}}>
        <FormControl isInvalid={isLoginInvalid}>
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
                    onChangeText={text => onChangeField('mobile', text)}
                  />
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <Box h={10} />
          {/* PIN Input */}
          <FormControl>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}}>
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={LockIcon} />
                  </InputSlot>
                  <InputField
                    type={showPin ? 'text' : 'password'}
                    placeholder="PIN (6 digit)"
                    bg="$white"
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
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Your mobile and password doesn't match
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Box h={10} />
        {/* Sign In Button */}
        <Button action="primary" onPress={onSignInPress}>
          <ButtonText>Sign In</ButtonText>
        </Button>
        <Box>
          <HStack style={{justifyContent: 'space-between'}}>
            {/* Remember checkbox */}
            <Checkbox size="sm">
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember me</CheckboxLabel>
            </Checkbox>
            {/* Forgot PIN */}
            <Button
              action="primary"
              variant="link"
              style={{borderRadius: 999}}
              // onPress={() => navigation.navigate('SignUp')}
            >
              <ButtonText size="sm">Forgot PIN?</ButtonText>
            </Button>
          </HStack>
        </Box>
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
        <Text sub style={{alignSelf: 'center', marginBottom: 5}}>
          Don't have an account?
        </Text>
        <Button
          action="primary"
          variant="outline"
          style={{borderRadius: 999}}
          bg="$white"
          onPress={() => navigation.navigate('SignUp')}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default LoginScreen;
