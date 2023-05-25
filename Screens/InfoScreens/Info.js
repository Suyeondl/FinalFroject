import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from "../../style";

const Info = (props) => {
  return(
    <ImageBackground>
    <View style = {styles.mainView}>

    </View>
    </ImageBackground>

  )
}
export default Info;