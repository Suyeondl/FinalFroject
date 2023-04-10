import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Home from './Screens/Home';
import { style } from './style';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions = {{
          headerStyle : {backgroundColor : "white"},
          headerTintColor: '#6699FF',
          headerTitleStyle: {fontWeight: "bold"},
          geaderTitleStyle : {fontWeigh : "bold", color : "white"}
        }}>

      <Stack.Screen
        name = "Login"
        component = {Login}
        options = {{title : "UmStation" }}
      />

      <Stack.Screen
        name = "Home"
        component = {Home}
        options = {{title : "UmStation"}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}