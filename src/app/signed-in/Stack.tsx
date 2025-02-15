import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSettings } from '../components/AppSettings';
import { NotFound } from '../components/NotFound';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { App as GettingStarted } from '../../luna-app/App';
import Profile from './Profile';
import Settings from './Settings';
import Home from './Home';
import Game from './Game';
import Payment from './Payment';
import VillageScreen from './Village';
import CollectionScreen from './Collection';
import TowerScreen from './TowerScreen';
import StealScreen from './StealScreen';


const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const ProfileStack = () => {
  const appSettings = useAppSettings();
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserSettings"
        options={{ title: appSettings.t('settings') }}
        component={Settings}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: appSettings.t('NotFound') }}
      />
    </Stack.Navigator>
  );
};

const SignedIn = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();
  const appSettings = useAppSettings();

  const screenOptions = {
    tabBarStyle: {
      paddingTop: insets.top,
    },
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, title: appSettings.t('Home') }}
      />
      <Stack.Screen
        name="User"
        component={ProfileStack}
        options={{ headerShown: false, title: appSettings.t('userInfo') }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{ headerShown: false, title: appSettings.t('Game') }}
      />
      <Stack.Screen
        name="Village"
        component={VillageScreen}
        options={{ headerShown: false, title: appSettings.t('Village') }}
      />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{ headerShown: false, title: appSettings.t('Village') }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, title: appSettings.t('Settings') }}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false, title: appSettings.t('Payment') }}
      />

      <Stack.Screen
        name="Tower"
        component={TowerScreen}
        options={{ headerShown: false, title: appSettings.t('MyTower') }}
      />
      <Stack.Screen
        name="Steal"
        component={StealScreen}
        options={{ headerShown: false, title: appSettings.t('Steal') }}
      />

    </Stack.Navigator>
  );
};

export default SignedIn;
