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
          headerStyle : {backgroundColor : "#D9E5FF"},
          geaderTitleStyle : {fontWeigh : "bold", color : "black"}
        }}>

      <Stack.Screen
        name = "Login"
        component = {Login}
        options = {{title : "Login Screen"}}
      />

      <Stack.Screen
        name = "Home"
        component = {Home}
        options = {{title : "Home Screen"}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}