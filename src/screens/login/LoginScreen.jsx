import React, {useContext} from 'react';
import {MainNavigatorContext} from '../../navigation/MainNavigator';
import RNIcon from 'react-native-vector-icons/AntDesign';
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
} from '@gluestack-ui/themed';
import {appImages} from '../../images';

const LoginScreen = ({navigation}) => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);
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
        {/* PIN Input */}
        <FormControl>
          <Center>
            <HStack style={{alignItems: 'center'}}>
              <RNIcon name="lock1" size={20} style={{marginRight: 10}} />
              <Input style={{flex: 1}}>
                <InputField
                  type="password"
                  placeholder="PIN (6 digit)"
                  bg="$white"
                />
              </Input>
            </HStack>
          </Center>
        </FormControl>
        <Box h={10} />
        {/* Sign In Button */}
        <Button action="primary" onPress={() => setIsSignedIn(true)}>
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
