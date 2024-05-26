import React, {useEffect, useState} from 'react';
import {
  Box,
  ButtonIcon,
  ButtonText,
  Fab,
  FabLabel,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ModalHeader,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {
  AlertCircleIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
  SmartphoneIcon,
  UserIcon,
  XIcon,
} from 'lucide-react-native';
import {HStack} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {FabIcon} from '@gluestack-ui/themed';
import {
  useDeleteData,
  useGetData,
  usePostData,
  usePutData,
} from '../../zustand/store';
import {useFocusEffect} from '@react-navigation/native';
import {handleCommonErrorRequest} from '../../libraries/helpers';
import {Modal} from '@gluestack-ui/themed';
import {ModalBackdrop} from '@gluestack-ui/themed';
import {ModalContent} from '@gluestack-ui/themed';
import {Heading} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {ModalBody} from '@gluestack-ui/themed';
import {Center} from '@gluestack-ui/themed';
import {FormControlErrorIcon} from '@gluestack-ui/themed';
import {ModalFooter} from '@gluestack-ui/themed';
import {Button} from '@gluestack-ui/themed';
import {ButtonSpinner} from '@gluestack-ui/themed';
import {Alert} from 'react-native';
import {RefreshControl} from '@gluestack-ui/themed';

const ContactItem = ({data, onEditPress, onDeletePress}) => (
  <Box w="100%" minHeight={50} p={10} borderRadius={20} borderWidth={0}>
    <HStack alignItems="center" w="100%">
      <Box mr={20} p={10} bg={primaryColor} borderRadius={999}>
        <UserIcon color="white" size={30} />
      </Box>
      <Box flex={1}>
        <Text color="$textDark700" fontWeight="$medium" fontSize={18}>
          {data.fullname}
        </Text>
        <Text color="$textDark500" fontSize={14}>
          +63{data.mobile}
        </Text>
      </Box>
      <Box>
        <Button variant="link" px={10} onPress={() => onEditPress(data)}>
          <ButtonIcon as={EditIcon} color={primaryColor} />
        </Button>
      </Box>
      <Box>
        <Button
          variant="link"
          action="negative"
          px={10}
          onPress={() => onDeletePress(data.id)}>
          <ButtonIcon as={XIcon} color="red" />
        </Button>
      </Box>
    </HStack>
  </Box>
);

const ContactFormModal = ({
  data = {
    id: '',
    fullname: '',
    mobile: '',
  },
  isOpen,
  onClose,
  isButtonDisabled,
  isButtonLoading,
  onButtonPress,
  isMobileInvalid,
  action,
}) => {
  const [fields, setFields] = useState(data);

  useEffect(() => {
    if (isOpen == true) {
      if (action == 'Update') {
        setFields(data);
      } else {
        setFields({
          id: '',
          fullname: '',
          mobile: '',
        });
      }
    }
  }, [isOpen]);

  const onChangeField = (field, value) => {
    let temp = {...fields};

    temp[field] = value;
    setFields(temp);
  };

  const checkEmptyInputs = () => {
    return fields.fullname == '' && fields.mobile == '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setFields({
          id: '',
          fullname: '',
          mobile: '',
        });
      }}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{action} Contact</Heading>
          <ModalCloseButton>
            <Icon as={XIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Center>
              <HStack style={{alignItems: 'center'}}>
                <Input style={{flex: 1}} aria-label="Name">
                  <InputSlot px="$3" bg="$white">
                    <InputIcon as={UserIcon} />
                  </InputSlot>
                  <InputField
                    placeholder="Full Name"
                    bg="$white"
                    value={fields.fullname}
                    onChangeText={text => onChangeField('fullname', text)}
                  />
                </Input>
              </HStack>
            </Center>
          </FormControl>
          <FormControl isInvalid={isMobileInvalid} mt={10}>
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
                    maxLength={10}
                    value={fields.mobile}
                    onChangeText={text => onChangeField('mobile', text)}
                  />
                </Input>
              </HStack>
            </Center>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Invalid mobile number</FormControlErrorText>
            </FormControlError>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={() => {
              onClose();
              setFields({
                id: '',
                fullname: '',
                mobile: '',
              });
            }}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            size="sm"
            action="primary"
            borderWidth="$0"
            onPress={() => onButtonPress(fields)}
            isDisabled={isButtonDisabled || checkEmptyInputs()}>
            {isButtonLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>{action}</ButtonText>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ContactsScreen = () => {
  const [isMount, setIsMount] = useState(false);
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isMobileInvalid, setMobileInvalid] = useState(false);
  const [selectedData, setSelectedData] = useState({
    id: '',
    fullname: '',
    mobile: '',
  });
  const [formAction, setFormAction] = useState('Add'); // "Add" || "Update"

  const contactsGetData = useGetData();
  const contactPostData = usePostData();
  const contactPutData = usePutData();
  const contactDeleteData = useDeleteData();

  useFocusEffect(
    React.useCallback(() => {
      getContacts();
    }, []),
  );

  useEffect(() => {
    if (isMount) {
      if (contactsGetData.success) {
        console.log('Contacts successfully loaded');
        setListData(contactsGetData.data);
      } else if (contactsGetData.error) {
        if (handleCommonErrorRequest(contactsGetData)) return;

        Alert.alert('Error', 'Something went wrong while loading contacts');
      }
    } else {
      setIsMount(true);
    }
  }, [
    contactsGetData.loading,
    contactsGetData.success,
    contactsGetData.data,
    contactsGetData.error,
    contactsGetData.errorData,
  ]);

  useEffect(() => {
    if (isMount) {
      if (contactPostData.success) {
        console.log('Contact successfully added');
        setShowModal(false);
        getContacts();
      } else if (contactPostData.error) {
        if (handleCommonErrorRequest(contactPostData)) return;

        Alert.alert('Error', 'Something went wrong while adding contact');
      }
    } else {
      setIsMount(true);
    }
  }, [
    contactPostData.loading,
    contactPostData.success,
    contactPostData.data,
    contactPostData.error,
    contactPostData.errorData,
  ]);

  useEffect(() => {
    if (isMount) {
      if (contactPutData.success) {
        console.log('Contact successfully updated');
        setShowModal(false);
        getContacts();
      } else if (contactPutData.error) {
        if (handleCommonErrorRequest(contactPutData)) return;

        Alert.alert('Error', 'Something went wrong while updating contact');
      }
    } else {
      setIsMount(true);
    }
  }, [
    contactPutData.loading,
    contactPutData.success,
    contactPutData.data,
    contactPutData.error,
    contactPutData.errorData,
  ]);

  useEffect(() => {
    if (isMount) {
      if (contactDeleteData.success) {
        console.log('Contact successfully deleted');
        getContacts();
      } else if (contactDeleteData.error) {
        if (handleCommonErrorRequest(contactDeleteData)) return;

        Alert.alert('Error', 'Something went wrong while deleting contacts');
      }
    } else {
      setIsMount(true);
    }
  }, [
    contactDeleteData.loading,
    contactDeleteData.success,
    contactDeleteData.data,
    contactDeleteData.error,
    contactDeleteData.errorData,
  ]);

  useEffect(() => {
    if (contactsGetData.data?.length > 0) {
      const filteredList = contactsGetData.data.filter(
        a => a.fullname?.includes(searchText) || a.mobile?.includes(searchText),
      );
      setListData(filteredList);
    }
  }, [searchText]);

  const getContacts = () => {
    contactsGetData.execute('/contacts');
  };

  const handleShowModal = (action, data = {}) => {
    if (action == 'Add') {
      setFormAction('Add');
      setShowModal(true);
    } else if (action == 'Update') {
      setFormAction('Update');
      setSelectedData(data);
      setShowModal(true);
    }
  };

  const handleDeleteContact = id => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => contactDeleteData.execute('/contacts', {id}),
        },
      ],
    );
  };

  const onButtonPress = fields => {
    let tempFields = {...fields};
    if (tempFields.mobile.length < 10) {
      setMobileInvalid(true);
      return;
    }
    if (formAction == 'Add') {
      delete tempFields.id;
      const params = {...tempFields};
      contactPostData.execute('/contacts', params);
    } else if (formAction == 'Update') {
      const params = {...tempFields};
      contactPutData.execute('/contacts', params);
    }
  };

  return (
    <Box h="100%" paddingTop={20}>
      <Box paddingHorizontal={20}>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          backgroundColor="white">
          <InputSlot pl="$3" bg="$white">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search name"
            onChangeText={text => setSearchText(text)}
          />
        </Input>
      </Box>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={contactsGetData.loading}
            onRefresh={getContacts}
          />
        }
        px={20}
        contentContainerStyle={{paddingTop: 10, paddingBottom: 20}}>
        {listData?.length > 0 &&
          listData.map((data, index) => (
            <ContactItem
              key={`gg-${index}`}
              data={data}
              onEditPress={data => handleShowModal('Update', data)}
              onDeletePress={id => handleDeleteContact(id)}
            />
          ))}
        {listData?.length >= 10 && (
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

      <Fab
        size="md"
        placement="bottom right"
        onPress={() => handleShowModal('Add')}>
        <FabIcon as={PlusIcon} />
      </Fab>

      <ContactFormModal
        isOpen={showModal}
        action={formAction}
        onClose={() => {
          setShowModal(false);
          setMobileInvalid(false);
        }}
        data={selectedData}
        isButtonDisabled={contactPostData.loading || contactPutData.loading}
        isButtonLoading={contactPostData.loading || contactPutData.loading}
        onButtonPress={fields => onButtonPress(fields)}
        isMobileInvalid={isMobileInvalid}
      />
    </Box>
  );
};

export default ContactsScreen;
