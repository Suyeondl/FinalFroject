import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';
import Service from './Screens/Service';
import Station from './Screens/Station';
import Umbrella from './Screens/Umbrella';
import User from './Screens/User';
import Info from './Screens/Info';

//Stack Navigation함수를 Stack변수명으로 저장
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        //헤더 UI
        screenOptions = {{
          headerStyle : {backgroundColor : "white"},
          headerTintColor: '#6699FF',
          headerTitleStyle: {fontWeight: "bold", fontSize:23},
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

      <Stack.Screen
        name = "SignUp"
        component = {SignUp}
        options = {{title : "회원가입"}}
      />

      <Stack.Screen
        name = "Service"
        component = {Service}
        options = {{title : "고객센터"}}
      />

      <Stack.Screen
        name = "Station"
        component = {Station}
        options = {{title : "Station 정보"}}
      />

      <Stack.Screen
        name = "Umbrella"
        component = {Umbrella}
        options = {{title : "폐우산 관리"}}
      />

      <Stack.Screen
        name = "User"
        component = {User}
        options = {{title : "사용자 관리"}}
      />

      <Stack.Screen
        name = "Info"
        component = {Info}
        options = {{title : "내 정보"}}
      />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}