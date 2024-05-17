import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {
  BellIcon,
  ContactRoundIcon,
  HistoryIcon,
  HomeIcon,
  SettingsIcon,
} from 'lucide-react-native';
import {Button, ButtonIcon} from '@gluestack-ui/themed';
import {primaryColor} from '../constant/colors';
import ContactsScreen from '../screens/contacts/ContactsScreen';

const Tab = createBottomTabNavigator();

const HomeTabsNavigator = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />,
          headerTitle: 'Gas Sensor Meter',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              variant="outline"
              borderWidth={0}
              onPress={() => navigation.navigate('History')}>
              <ButtonIcon size="xl" color={primaryColor} as={HistoryIcon} />
            </Button>
          ),
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
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <ContactRoundIcon color={color} size={size} />
          ),
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
