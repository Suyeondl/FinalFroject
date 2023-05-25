import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from "../../style";

/* Station 별 폐우산 적재 갯수 - 날짜 및 반납한 사용자, 반납 우산 사진 확인 가능 */
const Umbrella = (props) => {
  return(
    <ImageBackground style={styles.image} source={require('../../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    {/* 정보 수정 필요 */}
    <TouchableOpacity
      style = {styles.StationBTN}
      onPress={() => {
        props.navigation.navigate("StationInfo")
      }}>
      <Text style = {styles.StationNameText}>{station[0].st_id}</Text>
      <Text style = {styles.StationaddressText}>{station[0].st_address}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style = {styles.StationBTN2}
      onPress={() => {
        props.navigation.navigate("StationInfo")
      }}>
      <Text style = {styles.StationNameText2}>{station[1].st_id}</Text>
      <Text style = {styles.StationaddressText2}>{station[1].st_address}</Text>
    </TouchableOpacity>


    </View>
    </ImageBackground>

  )
}
export default Umbrella;