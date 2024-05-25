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

const App = () => {
  const {client} = GGAbly;
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    SplashScreen.hide();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    client.connection.on('connected', function () {
      console.log('Successfully connected to ably');
    });

    client.connection.on('failed', function () {
      console.log('Successfully connected to ably');
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
