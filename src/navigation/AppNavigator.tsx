import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import SplashScreen from '../screens/SplashScreen';
import UserListScreen from '../screens/UserListScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerStyle = {
  headerStyle: { backgroundColor: '#ffffff' },
  headerTintColor: '#1a1a2e',
  headerTitleStyle: { fontWeight: '700' as const },
  headerShadowVisible: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="List"
          component={UserListScreen}
          options={({ navigation }) => ({
            ...headerStyle,
            headerShown: true,
            title: 'People',
            animation: 'fade',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 4 }}>
                <Ionicons name="heart-outline" size={24} color="#6c63ff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ ...headerStyle, headerShown: true, title: 'Favoritos', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ ...headerStyle, headerShown: true, title: 'Perfil', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}