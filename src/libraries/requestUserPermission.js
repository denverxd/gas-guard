import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  } catch (error) {
    console.log(error);
    return false;
  }
};
