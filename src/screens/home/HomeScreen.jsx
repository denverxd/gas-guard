import {View, Text, Button} from 'react-native';
import React, {useContext} from 'react';
import {MainNavigatorContext} from '../../navigation/MainNavigator';

const HomeScreen = () => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Sign Out" onPress={() => setIsSignedIn(false)} />
    </View>
  );
};

export default HomeScreen;
