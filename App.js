import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';
import ServiceMain from './Screens/ServiceScreens/ServiceMain';
import StationReport from './Screens/ServiceScreens/StationReport';
import RentalReturnReport from './Screens/ServiceScreens/RentalReturnReport';
import BRAnswer from './Screens/ServiceScreens/BRAnswer';
import RRAnswer from './Screens/ServiceScreens/RRAnswer';
import AnswerList from './Screens/ServiceScreens/AnswerList';
import HistoryAnswer from './Screens/ServiceScreens/HistoryAnswer';
import Station from './Screens/StationScreens/Station';
import StationInfo from './Screens/StationScreens/StationInfo';
import Map from './Screens/StationScreens/Map';
import DonateStation from './Screens/UmbrellaScreens/DonateStation';
import Umbrella from './Screens/UmbrellaScreens/Umbrella';
import UmInfo from './Screens/UmbrellaScreens/UmInfo';
import User from './Screens/UserScreens/User';
import UserInfo from './Screens/UserScreens/UserInfo';
import Info from './Screens/InfoScreens/Info';


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
        options = {{title : "UmStation" }}
      />

      <Stack.Screen
        name = "SignUp"
        component = {SignUp}
        options = {{title : "회원가입"}}
      />

      <Stack.Screen
        name = "ServiceMain"
        component = {ServiceMain}
        options = {{title : "고객센터"}}
      />

      <Stack.Screen
        name = "StationReport"
        component = {StationReport}
        options = {{title : "Station 문의"}}
      />

      <Stack.Screen
        name = "RentalReturnReport"
        component = {RentalReturnReport}
        options = {{title : "대여 반납 문의"}}
      />

      <Stack.Screen
        name = "BRAnswer"
        component = {BRAnswer}
        options = {{title : " Station 문의 답변 "}}
      />

      <Stack.Screen
        name = "RRAnswer"
        component = {RRAnswer}
        options = {{title : " 대여 반납 문의 답변 "}}
      />

      <Stack.Screen
        name = "AnswerList"
        component = {AnswerList}
        options = {{title : " 답변 내역 "}}
      />

      <Stack.Screen
        name = "HistoryAnswer"
        component = {HistoryAnswer}
        options = {{title : " 답변 "}}
      />

      <Stack.Screen
        name = "Station"
        component = {Station}
        options = {{title : "Station 정보"}}
      />

      <Stack.Screen
        name = "StationInfo"
        component = {StationInfo}
        options = {{title : "Station 정보"}}
      />

      <Stack.Screen
        name = "Map"
        component = {Map}
        options = {{title : "Station 정보"}}
      />

      {/* <Stack.Screen
        name="Map"
        component={({ navigation }) => <Map navigation={navigation} />}
        options={{ title: 'Station 정보' }}
      /> */}

      <Stack.Screen
        name = "DonateStation"
        component = {DonateStation}
        options = {{title : "폐우산 관리"}}
      />

      <Stack.Screen
        name = "Umbrella"
        component = {Umbrella}
        options = {{title : "폐우산 관리"}}
      />

      <Stack.Screen
        name = "UmInfo"
        component = {UmInfo}
        options = {{title : "폐우산 정보"}}
      />

      <Stack.Screen
        name="User"
        component = {User}
        // component={({ navigation }) => <User navigation={navigation} />}
        options={{ title: '사용자 관리' }}
      />

      <Stack.Screen
        name = "UserInfo"
        component = {UserInfo}
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