import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import SplashScreen from 'react-native-splash-screen';
import {AblyProvider} from 'ably/react';

import GGAbly from './src/libraries/gasGuardAbly.js';
import {requestUserPermission} from './src/libraries/requestUserPermission.js';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/index.js';
import PushNotification from 'react-native-push-notification';

const App = () => {
  PushNotification.configure({
    onRegister: function (token) {
      // console.log('TOKEN:', token);
    },
    onNotification(notification) {
      console.log('Notification', notification);
    },
    popInitialNotification: true,
  });
  const {client} = GGAbly;
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    SplashScreen.hide();
    PushNotification.createChannel(
      {
        channelId: 'general', // (required)
        channelName: 'General Push Notif', // (required)
        // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    client.connection.on('connected', function () {
      console.log('Successfully connected to ably');
    });

    client.connection.on('failed', function () {
      console.log('Successfully connected to ably');
    });

    const notifChannel = GGAbly.GG_CHANNELS.notif;
    GGAbly.getChannelSub(notifChannel).subscribe(message => {
      const notif_data = JSON.parse(message.data);
      console.log({notif_data});
      PushNotification.localNotification({
        channelId: 'general',
        title: notif_data.title,
        message: notif_data.body,
      });
    });

    return unsubscribe;
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    console.log(fcmToken);
  };

  return (
    <Provider store={store}>
      <AblyProvider client={client}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
      </AblyProvider>
    </Provider>
  );
};

export default App;
