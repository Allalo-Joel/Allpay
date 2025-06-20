import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Toaster } from 'sonner-native';
import { WalletProvider } from './context/WalletContext';

import HomeScreen from './screens/HomeScreen';
import WalletScreen from './screens/WalletScreen';
import ScanScreen from './screens/ScanScreen';
import TransferScreen from './screens/TransferScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessageScreen from './screens/MessageScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = 'home-outline';
        switch (route.name) {
          case 'Home': iconName = 'home-outline'; break;
          case 'Wallet': iconName = 'wallet-outline'; break;
          case 'Transfer': iconName = 'send-outline'; break;
          case 'Message': iconName = 'chatbubble-ellipses-outline'; break;
          case 'Profile': iconName = 'person-outline'; break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FB512D',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#FFFFFF' },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
       <Tab.Screen name="Scan" component={ScanScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <SafeAreaProvider>
        <Toaster />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </WalletProvider>
  );
}
