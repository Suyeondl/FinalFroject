import { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from "../style";

/* HomeScreen - 메인 기능 선택 화면 */
const Home = (props) => {
  const [admin, setAdmin] = useState("") //불러온 관리자 정보

  return(
    <ImageBackground style={styles.image} source={require('../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    {/* 관리자 정보 버튼 */}
    <TouchableOpacity 
      style = {styles.infoBTN}
      onPress={() => {
        props.navigation.navigate("Info")
      }}>
        <View style = {styles.homeView}>
        <Image style={styles.homeImage} source={require('../images/UserIcon.png')} resizeMode="contain"></Image>

        <Text style = {styles.adminText}>관리자</Text>

        {/* 관리자 정보 출력 (이름, 아이디, 이메일) */}
        <Text style = {styles.nameText}>{admin[0].a_name}</Text>
        <Text style = {styles.idText}>{admin[0].a_id}</Text>
        <Text style = {styles.serialText}>{admin[0].a_email}</Text>

        </View>
    </TouchableOpacity>


    {/* Station 버튼  */}
    <TouchableOpacity 
      style = {styles.homeBTN}
      onPress={() => {
        props.navigation.navigate("Station")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Station.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* Service 버튼 */}
    <TouchableOpacity
      style = {styles.homeBTN4}
      onPress={() => {
        props.navigation.navigate("Service")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Service.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* User 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN2}
      onPress={() => {
        props.navigation.navigate("User")
      }}>
      <ImageBackground style={styles.image} source={require('../images/User.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* 폐우산 버튼 */}
    <TouchableOpacity
      style = {styles.homeBTN3}
      onPress={() => {
        props.navigation.navigate("Umbrella")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Um.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    </View>
    </ImageBackground>

  )
}
export default Home;