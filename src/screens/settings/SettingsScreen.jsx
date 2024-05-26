import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
} from '@gluestack-ui/themed';
import {
  ChevronRightIcon,
  LockIcon,
  LogOutIcon,
  Settings2Icon,
  UserIcon,
} from 'lucide-react-native';
import React, {useContext} from 'react';
import VersionText from '../../components/VersionText';
import {MainNavigatorContext} from '../../navigation/MainNavigator';
import {setStoreData} from '../../libraries/helpers';

const SettingsScreen = ({navigation}) => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);

  const onSignOutPress = () => {
    setStoreData('user_data', null);
    setIsSignedIn(false);
  };

  return (
    <Box w="100%" h="$full" p={20}>
      <Box mb={30}>
        {/* Profile */}
        <Button
          variant="outline"
          borderRadius={0}
          justifyContent="space-between"
          bg="white"
          onPress={() => navigation.navigate('Profile')}>
          <HStack alignItems="center" gap={10}>
            <ButtonIcon as={UserIcon} />
            <ButtonText textAlign="left">Profile</ButtonText>
          </HStack>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
        {/* PIN */}
        <Button
          variant="outline"
          borderRadius={0}
          borderTopWidth={0}
          justifyContent="space-between"
          bg="white"
          onPress={() => navigation.navigate('PIN')}>
          <HStack alignItems="center" gap={10}>
            <ButtonIcon as={LockIcon} />
            <ButtonText textAlign="left">PIN</ButtonText>
          </HStack>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
        {/* Preferences */}
        <Button
          variant="outline"
          borderRadius={0}
          borderTopWidth={0}
          justifyContent="space-between"
          bg="white"
          onPress={() => navigation.navigate('Preferences')}>
          <HStack alignItems="center" gap={10}>
            <ButtonIcon as={Settings2Icon} />
            <ButtonText textAlign="left">Preferences</ButtonText>
          </HStack>
          <ButtonIcon as={ChevronRightIcon} />
        </Button>
        {/* Sign Out */}
        <Button
          variant="outline"
          action="negative"
          borderRadius={0}
          mt={10}
          justifyContent="space-between"
          bg="white"
          onPress={onSignOutPress}>
          <HStack alignItems="center" gap={10}>
            <ButtonIcon as={LogOutIcon} />
            <ButtonText textAlign="left">Sign Out</ButtonText>
          </HStack>
          {/* <ButtonIcon as={ChevronRightIcon} /> */}
        </Button>
      </Box>
      <Box w="$full" position="absolute" bottom={10} right={5}>
        <VersionText />
      </Box>
    </Box>
  );
};

export default SettingsScreen;
