import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import SplashScreen from 'react-native-splash-screen';
import {AblyProvider} from 'ably/react';

import GGAbly from './src/libraries/gasGuardAbly.js';

const App = () => {
  const {client} = GGAbly;
  useEffect(() => {
    SplashScreen.hide();

    client.connection.on('connected', function () {
      console.log('Successfully connected to ably');
    });

    client.connection.on('failed', function () {
      console.log('Successfully connected to ably');
    });

    return () => {};
  }, []);

  return (
    <AblyProvider client={client}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </AblyProvider>
  );
};

export default App;
