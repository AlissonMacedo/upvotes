import * as React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
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
            headerTitle: props => <View style={styles.ViewText}>
              <Text style={styles.TextHeader}>Home</Text>
            </View>,
            headerRight: () => (
              <View style={styles.ViewButton}>
                <Button
                  style={{ margin: 10 }}
                  onPress={() => navigation.navigate('NewMessage')}
                  title="Novo"
                  color="#333"
                />
              </View>
            ),
          })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ViewButton: {
    marginRight: 10,
  },
  ViewText: {
    flex: 1,
  },
  TextHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  }
})

export default Routes;