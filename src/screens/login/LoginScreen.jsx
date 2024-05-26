import React, {useContext, useEffect, useState} from 'react';
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
  FormControlErrorIcon,
  FormControlError,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import {appImages} from '../../images';
import {
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  SmartphoneIcon,
} from 'lucide-react-native';
import VersionText from '../../components/VersionText';
import messaging from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';
import {useGetData, usePostData} from '../../zustand/store';
import {Alert} from 'react-native';
import {
  getStoreData,
  handleCommonErrorRequest,
  setStoreData,
} from '../../libraries/helpers';
import {useFocusEffect} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);

  const [isMount, setIsMount] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);
  const [loginFields, setLoginFields] = useState({
    mobile: '',
    pin: '',
  });
  const [token, setToken] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const loginPostData = usePostData();
  const preferencesGetData = useGetData();
  // const notif = Notification.configure;

  useFocusEffect(
    React.useCallback(() => {
      getLastMobileLogin();
      preferencesGetData.execute('/preferences');
    }, []),
  );

  useEffect(() => {
    getFcmToken();
    handleDeviceId();
  }, []);

  useEffect(() => {
    if (isMount) {
      console.log({loginPostData});
      if (loginPostData.success) {
        setIsSignedIn(true);
        setIsLoginInvalid(false);
        const user_data = JSON.stringify(loginPostData.data);
        const userMobile = loginPostData.data.mobile || '';
        const remember_me = JSON.stringify({
          value: rememberMe,
          mobile: userMobile,
        });
        console.log({user_data});
        setStoreData('user_data', user_data);
        setStoreData('remember_me', remember_me);
        setStoreData('last_mobile', userMobile);
      } else if (loginPostData.error) {
        if (handleCommonErrorRequest(loginPostData)) return;

        setIsLoginInvalid(true);
      }
    } else {
      setIsMount(true);
    }
  }, [
    loginPostData.loading,
    loginPostData.success,
    loginPostData.data,
    loginPostData.error,
    loginPostData.errorData,
  ]);

  useEffect(() => {
    if (isMount) {
      console.log({preferencesGetData});
      if (preferencesGetData.success) {
        console.log('Successfully get preferences');
        const preferences_data = JSON.stringify(preferencesGetData.data);
        setStoreData('preferences_data', preferences_data);
      } else if (preferencesGetData.error) {
        if (handleCommonErrorRequest(preferencesGetData, false)) return;
        console.log('Error getting preferences');
      }
    } else {
      setIsMount(true);
    }
  }, [
    preferencesGetData.loading,
    preferencesGetData.success,
    preferencesGetData.data,
    preferencesGetData.error,
    preferencesGetData.errorData,
  ]);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    console.log(fcmToken);
    setToken(fcmToken);
  };

  const handleDeviceId = async () => {
    const id = await getUniqueId();

    console.log(id);
    setDeviceId(id);
  };

  const handleShowPin = () => {
    setShowPin(showPin => {
      return !showPin;
    });
  };

  const getLastMobileLogin = async () => {
    let lastMobileLogin = await getStoreData('last_mobile');
    if (lastMobileLogin) {
      onChangeField('mobile', lastMobileLogin);
    }
  };

  const onChangeField = (field, value) => {
    let tempFields = {...loginFields};

    if (field == 'mobile' || field == 'pin') {
      setIsLoginInvalid(false);
    }

    tempFields[field] = value;
    setLoginFields(tempFields);
  };

  const onSignInPress = () => {
    let tempFields = {...loginFields};

    for (let item of Object.values(tempFields)) {
      if (item === '') {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
    }

    const params = {...tempFields};
    loginPostData.execute('/login', params);
  };

  return (
    <Box w="100%" h="100%">
      <VersionText />
      {/* Logo */}
      <Image
        source={appImages.mainLogo}
        alt=""
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
          {/* <FormControl>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}}>
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={SmartphoneIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Token"
                    bg="$white"
                    // keyboardType="number-pad"
                    value={token}
                    // onChangeText={text => onChangeField('mobile', text)}
                  />
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <FormControl>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}}>
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={SmartphoneIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Token"
                    bg="$white"
                    // keyboardType="number-pad"
                    value={deviceId}
                    // onChangeText={text => onChangeField('mobile', text)}
                  />
                </Input>
              </HStack>
            </Center>
          </FormControl> */}
          {/* Mobile Input */}
          <FormControl>
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
                    value={loginFields.mobile}
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
                    keyboardType="number-pad"
                    maxLength={6}
                    value={loginFields.pin}
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
        <Button
          action="primary"
          onPress={onSignInPress}
          isDisabled={loginPostData.loading}>
          {loginPostData.loading ? (
            <ButtonSpinner />
          ) : (
            <ButtonText>Sign In</ButtonText>
          )}
        </Button>
        <Box>
          <HStack style={{justifyContent: 'space-between'}}>
            {/* Remember checkbox */}
            <Checkbox
              aria-label="Remember me"
              size="sm"
              defaultIsChecked={true}
              value={rememberMe}
              onChange={value => setRememberMe(value)}>
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember me</CheckboxLabel>
            </Checkbox>
            {/* Forgot PIN */}
            <Button action="primary" variant="link" rounded="$full" isDisabled>
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
