import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../style";

const Home = (props) => {
  return(
    <ImageBackground>
    <View style = {styles.mainView}>

    {/* Info 버튼 */}
    <TouchableOpacity 
      style = {styles.infoBTN}
      onPress={() => {
        props.navigation.navigate("Info")
      }}>
        <Text style = {styles.homeText}>(관리자 정보)</Text>
    </TouchableOpacity>

    {/* Station, 고객센터 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN}
      onPress={() => {
        props.navigation.navigate("Station")
      }}>
        <Text style = {styles.homeText}>Station</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style = {styles.homeBTN4}
      onPress={() => {
        props.navigation.navigate("Service")
      }}>
        <Text style = {styles.homeText}>고객센터</Text>
    </TouchableOpacity>

    {/* User, 폐우산 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN2}
      onPress={() => {
        props.navigation.navigate("User")
      }}>
        <Text style = {styles.homeText}>User</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style = {styles.homeBTN3}
      onPress={() => {
        props.navigation.navigate("Umbrella")
      }}>
        <Text style = {styles.homeText}>폐우산</Text>
    </TouchableOpacity>

    </View>
    </ImageBackground>

  )
}
export default Home;