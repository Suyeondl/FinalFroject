import { useState } from "react";
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../style";

/* SignUpScreen - 관리자 회원가입 화면 */
const SignUp = (props) => {
  const [nameTextInput, setNameTextInput] = useState(""); //회원가입 관리자 이름
  const [idTextInput, setIdTextInput] = useState(""); //회원가입 관리자 ID
  const [pwTextInput, setPwTextInput] = useState(""); //회원가입 관리자 PW

  //회원가입 입력값을 useState에 저장
  const nameChangeInput = (event) =>{
    console.log("Input Name", event)
    setNameTextInput(event)
  }
  const idChangeInput = (event) =>{
    console.log("Input ID", event)
    setIdTextInput(event)
  }
  const pwChangeInput = (event) =>{
    console.log("Input PW", event)
    setPwTextInput(event)
  }

  //관리자 정보 추가하기(회원가입)
  const addManager = async() => {
    try{
      await addDoc(collection(db, "Admin"), {
          name: nameTextInput,
          st_id: idTextInput,
          st_pw: pwTextInput,
      });
      //값 초기화
      alert("Add Admin")
      setNameTextInput("")
      setIdTextInput("")
      setPwTextInput("")
    }catch(error){ console.log(error.message) }
  }

  return(
    <ImageBackground style={styles.image} source={require('../images/LoginScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    <Text style = {styles.signUpText}>Name</Text>
    <TextInput
      value = {nameTextInput}
      onChangeText = {nameChangeInput}
      placeholder= "User Name"
      style = {styles.loginputText}
    />
    <Text style = {styles.signUpText}>ID</Text>
    <TextInput
      value = {idTextInput}
      onChangeText = {idChangeInput}
      placeholder= "User ID"
      style = {styles.loginputText}
    />
    <Text style = {styles.signUpText}>PassWord</Text>
    <TextInput
      value = {pwTextInput}
      onChangeText = {pwChangeInput}
      placeholder= "Password"
      style = {styles.loginputText}
    />

    {/* signup 시 회원가입 정보 전달 */}
    <TouchableOpacity style={styles.loginBTN} onPress={addManager}>
      <Text style={styles.Text}>Sign Up</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.loginBTN}
      onPress={()=>{
      props.navigation.navigate("Login")
      }}
    >
    <Text style={styles.Text}>Login</Text>
      </TouchableOpacity>

    </View>
    </ImageBackground>

  )
}
export default SignUp;