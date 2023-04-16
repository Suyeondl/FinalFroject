import { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../style";

/* HomeScreen - 메인 기능 선택 화면 */
const Home = (props) => {
  return(
    <ImageBackground style={styles.image} source={require('../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    {/* Info 버튼 */}
    <TouchableOpacity 
      style = {styles.infoBTN}
      onPress={() => {
        props.navigation.navigate("Info")
      }}>
        <View style = {styles.homeView}>
        <Image style={styles.homeImage} source={require('../images/UserIcon.png')} resizeMode="contain"></Image>
        <Text style = {styles.adminText}>관리자</Text>
        {/* 일단 하드코딩함 바꿔야됨 */}
        <Text style = {styles.nameText}>김수연</Text>
        <Text style = {styles.idText}>ID : suyeon2355</Text>
        <Text style = {styles.serialText}>Serial Number : 84941256</Text>

        </View>
    </TouchableOpacity>


    {/* Station, 고객센터 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN}
      onPress={() => {
        props.navigation.navigate("Station")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Station.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    <TouchableOpacity
      style = {styles.homeBTN4}
      onPress={() => {
        props.navigation.navigate("Service")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Service.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* User, 폐우산 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN2}
      onPress={() => {
        props.navigation.navigate("User")
      }}>
      <ImageBackground style={styles.image} source={require('../images/User.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>
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