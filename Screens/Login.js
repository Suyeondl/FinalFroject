import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { event } from "react-native-reanimated";
import { styles } from "../style";

/* 관리자 로그인 화면
// DB를 통해 회원 식별, 회원가입 선택 가능 */

const Login = (props) => {
  const [idTextInput, setIdTextinput] = useState("") //입력받은 id
  const [pwTextInput, setPwTextinput] = useState("") //입력받은 password
  const [admin, setAdmin] = useState("") //불러온 관리자 정보

  //로그인 입력값 useState에 저장
  const idChangeInput = (event) => {
    console.log("input ID", event)
    setIdTextinput(event)
  }
  const pwChangeInput = (event) => {
    console.log("input PW", event)
    setPwTextinput(event)
  }

const loginDB = async ()=>{
  try{
    //q:쿼리문,  Readadmin:쿼리문으로 식별한 DB   
    const q = query( collection(db, "Admin"), where('a_id',"==", idTextInput))
    const Readadmin = await getDocs(q); 
    //ID존재 
    if(Readadmin != null){  
      Readadmin.docs.map((row, idx) =>{ 
        //PW 일치
        if(row.data().a_pw == pwTextInput){
          setAdmin(row.data()) //최종 admin DB 저장
          alert("success login")
          //로그인 성공 - Home으로 이동
          props.navigation.navigate("Home", {
            adminId: idTextInput
          }) 
        //PW 불일치
        }else alert("Password Mismatch")
      })}
    }catch(error){ console.log(error.message)}
  }

  return (
    <ImageBackground style={styles.image} source={require('../images/LoginScreen.png')} resizeMode='cover'>
    <View style = {styles.mainView}>
    
    <TextInput
      style = {styles.loginputText}
      value = {idTextInput}
      onChangeText = {idChangeInput}
      placeholder="ID"
    />
    <TextInput
      style = {styles.loginputText}
      value = {pwTextInput}
      secureTextEntry
      onChangeText = {pwChangeInput}
      placeholder="PASSWORD"
    />
    <TouchableOpacity
      style = {styles.loginBTN}
      onPress={loginDB}>
        <Text style = {styles.Text}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style = {styles.loginBTN}
      onPress={() => {
        props.navigation.navigate("SignUp")
      }}>
        <Text style = {styles.Text}>SignUp</Text>
    </TouchableOpacity>

    </View>
    </ImageBackground>
  )
}

export default Login;