import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../../style";

/* Station 별 폐우산 적재 갯수 - 날짜 및 반납한 사용자, 반납 우산 사진 확인 가능 */
const Umbrella = (props) => {
  return(
    <ImageBackground>
    <View style = {styles.mainView}>

    {/* 정보 수정 필요 */}
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
export default Umbrella;