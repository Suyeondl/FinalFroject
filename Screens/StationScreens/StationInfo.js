import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../../style";
import HorizonLine from "../../utils/HorizontalLine";
//C:\FinalProject\node_modules\react-native\ReactAndroid\build.gradle


/* Station 정보 관리 - 대여가능여부, 위치 및 주소, 대여 우산 여부, 폐우산 적재 갯수 확인 가능 및 수정, 삭제, 등록 */
const Station = (props) => {
  return(
    <ImageBackground> 
    <View style = {styles.mainView}>

      <Text style = {styles.StationNameText}>Station 1</Text>
      <HorizonLine/>

    </View>
    </ImageBackground>
  )
}
export default Station;