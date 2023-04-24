import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../../style";
//C:\FinalProject\node_modules\react-native\ReactAndroid\build.gradle


/* Station 정보 관리 - 대여가능여부, 위치 및 주소, 대여 우산 여부, 폐우산 적재 갯수 확인 가능 및 수정, 삭제, 등록 */
const Station = (props) => {
  return(
    <ImageBackground style={styles.image} source={require('../../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    <TouchableOpacity
      style = {styles.StationBTN}
      onPress={() => {
        props.navigation.navigate("StationInfo")
      }}>
      <Text style = {styles.StationNameText}>Station 1</Text>
      <Text style = {styles.StationaddressText}>충청남도 아산시 탕정면 선문로221번길 70</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style = {styles.StationBTN2}
      onPress={() => {
        props.navigation.navigate("StationInfo")
      }}>
      <Text style = {styles.StationNameText2}>Station 2</Text>
      <Text style = {styles.StationaddressText2}>충청남도 아산시 배방읍 희망로 100</Text>
    </TouchableOpacity>


    </View>
    </ImageBackground>
  )
}
export default Station;