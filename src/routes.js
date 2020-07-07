import * as React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Login from './pages/login/login';
import Register from './pages/register/register'

import Home from './pages/home/home';
import NewMessage from './pages/newMessage/newMessage';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
        <Stack.Screen name="NewMessage" component={NewMessage} options={{ headerShown: true }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: props => <Text>Home</Text>,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('NewMessage')}
                title="Novo"
                color="#333"
              />
            ),
          })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;