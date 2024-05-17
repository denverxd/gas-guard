import React from 'react';
import {
  Box,
  Fab,
  FabLabel,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {PlusIcon, SearchIcon, UserIcon} from 'lucide-react-native';
import {HStack} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {FabIcon} from '@gluestack-ui/themed';

const testContactList = [
  {
    name: 'Juan Dela Cruz',
    mobile: '9123456789',
  },
  {
    name: 'Pedro Reyes',
    mobile: '9123456788',
  },
  {
    name: 'John Doe',
    mobile: '9123456787',
  },
  {
    name: 'Bobby Salazar',
    mobile: '9123456786',
  },
  {
    name: 'Naruto Uzumaki',
    mobile: '9123456785',
  },
  {
    name: 'Natsu Dragneel',
    mobile: '9123456784',
  },
  {
    name: 'Monkey D. Luffy',
    mobile: '9123456783',
  },
  {
    name: 'Rimuru Tempest',
    mobile: '9123456782',
  },
  {
    name: 'Andou July',
    mobile: '9123456781',
  },
  {
    name: 'Peter Parker',
    mobile: '9123456780',
  },
];

const ContactItem = ({name, mobile}) => (
  <Box w="100%" minHeight={50} p={10} borderRadius={20} borderWidth={0}>
    <HStack alignItems="center" w="100%">
      <Box mr={20} p={10} bg={primaryColor} borderRadius={999}>
        <UserIcon color="white" size={30} />
      </Box>
      <Box flex={1}>
        <Text color="$textDark700" fontWeight="$medium" fontSize={18}>
          {name}
        </Text>
        <Text color="$textDark500" fontSize={14}>
          +63{mobile}
        </Text>
      </Box>
    </HStack>
  </Box>
);

const ContactsScreen = () => {
  const sampleListLength = 10;
  return (
    <Box h="100%" paddingTop={20}>
      <Box paddingHorizontal={20} backgroundColor="white">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}>
          <InputSlot pl="$3" bg="$white">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search name" />
        </Input>
      </Box>

      <ScrollView
        px={20}
        contentContainerStyle={{paddingTop: 10, paddingBottom: 20}}>
        {testContactList.map(({name, mobile}) => (
          <ContactItem key={mobile} name={name} mobile={mobile} />
        ))}
        {testContactList.length >= 10 && (
          <Box mt={5}>
            <HStack justifyContent="center" alignItems="center">
              <Box h={0.75} w={50} backgroundColor="$textLight300" />
              <Text color="$textLight400" fontSize={8} px={5}>
                END OF LIST
              </Text>
              <Box h={0.75} w={50} backgroundColor="$textLight300" />
            </HStack>
          </Box>
        )}
      </ScrollView>

      <Fab size="md" placement="bottom right">
        <FabIcon as={PlusIcon} />
      </Fab>
    </Box>
  );
};

export default ContactsScreen;
