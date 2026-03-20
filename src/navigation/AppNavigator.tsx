import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SplashScreen from '../screens/SplashScreen';
import UserListScreen from '../screens/UserListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="List"
          component={UserListScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#ffffff' },
            headerTintColor: '#1a1a2e',
            headerTitleStyle: { fontWeight: '700' },
            title: 'People',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#ffffff' },
            headerTintColor: '#1a1a2e',
            headerTitleStyle: { fontWeight: '700' },
            title: 'Perfil',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}