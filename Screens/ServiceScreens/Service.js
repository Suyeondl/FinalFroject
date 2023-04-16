import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../../style";
import { firebase_db } from "../../firebaseConfig";
import HorizonLine from "../../utils/HorizontalLine";

/* 고객센터 */
const Service = (props) => {
  return(
    <ImageBackground>
    <View style = {styles.mainView}>

    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("FaultReport")
      }}>
      <Text style = {styles.ServiceText}>Station 고장신고</Text>
    </TouchableOpacity>

    <HorizonLine />

    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("RentalReturnReport")
      }}>
      <Text style = {styles.ServiceText}>대여 반납 신고</Text>
    </TouchableOpacity>

    </View>
    </ImageBackground>

  )
}
export default Service;