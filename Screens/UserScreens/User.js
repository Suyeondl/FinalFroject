import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../../style";


/* 사용자 관리 - 사용자 성명, 가입 일시, 대여 기록, 폐우산 기부 기록 열람 및 정보 삭제 가능 */
const User = (props) => {
  return(
    <ImageBackground>
    <View style = {styles.mainView}>

    <TouchableOpacity
      style = {styles.StationBTN}
      onPress={() => {
        props.navigation.navigate("UserInfo")
      }}>
      {/* <Image style={styles.homeImage} source={require('../../images/User.png')} resizeMode="contain"></Image> */}
      <Text style = {styles.UserText}>UserID #1</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style = {styles.StationBTN2}
      onPress={() => {
        props.navigation.navigate("UserInfo")
      }}>
      <Text style = {styles.UserText}>UserID #2</Text>
    </TouchableOpacity>


    </View>
    </ImageBackground>

  )
}
export default User;