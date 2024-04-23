import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {BellIcon, HomeIcon, SettingsIcon} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const HomeTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />,
          headerTitle: 'Gas Sensor Meter',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color, size}) => <BellIcon color={color} size={size} />,
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <SettingsIcon color={color} size={size} />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;
