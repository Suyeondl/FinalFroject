import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { event } from "react-native-reanimated";

const Login = (props) => {
    const [idTextInput, setIdTextinput] = useState("") //입력받은 id
    const [pwTextInput, setPwTextinput] = useState("") //입력받은 password
    const [manager, setManager] = useState("") //불러온 관리자 정보

    //로그인 입력값 useState에 저장
    const idChangeInput = (event) => {
      set
      setIdTextinput(event)
    }
    const pwChangeInput = (event) => {
      setPwTextinput(event)
    }

  return(
    <ImageBackground>
    <View>

    <TextInput
      value = {idTextInput}
      onChangeText = {idChangeInput}
      placeholder="ID"
    />
    <TextInput
      value = {pwTextInput}
      onChangeText = {pwChangeInput}
      placeholder="PASSWORD"
    />

    </View>
    </ImageBackground>
  )
}

export default Login;