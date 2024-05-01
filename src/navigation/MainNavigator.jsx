import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import HomeTabsNavigator from './HomeTabsNavigator';
import UpdateProfileScreen from '../screens/settings/profile/UpdateProfileScreen';
import UpdatePinScreen from '../screens/settings/pin/UpdatePinScreen';
import PreferencesScreen from '../screens/settings/preferences/PreferencesScreen';

const Stack = createNativeStackNavigator();
export const MainNavigatorContext = React.createContext();

const MainNavigator = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const mainNavigatorContextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn],
  );
  return (
    <MainNavigatorContext.Provider value={mainNavigatorContextValue}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              options={{title: 'Sign Up'}}
              component={SignUpScreen}
            />
          </>
        ) : (
          // whatever screens if user is logged in
          <>
            {/* <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Gas Sensor Meter', headerTitleAlign: 'center'}}
            /> */}
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabsNavigator}
              options={{headerShown: false}}
            />

            {/* Settings Stack */}
            <Stack.Screen
              name="Profile"
              options={{title: 'Update Profile'}}
              component={UpdateProfileScreen}
            />
            <Stack.Screen
              name="PIN"
              options={{title: 'Update PIN'}}
              component={UpdatePinScreen}
            />
            <Stack.Screen name="Preferences" component={PreferencesScreen} />
          </>
        )}
      </Stack.Navigator>
    </MainNavigatorContext.Provider>
  );
};

export default MainNavigator;
