import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { styles } from "../../style";


/* 사용자 관리 - 사용자 성명, 가입 일시, 대여 기록, 폐우산 기부 기록 열람 및 정보 삭제 가능 */
const User = (props) => {
  const [user, setUser] = useState("") //불러온 사용자 정보

      const loginDB = async ()=>{
        try{
            //q:쿼리문,  Readstudent:쿼리문으로 식별한 DB   
            const q = await query( collection(db, "User"), where('u_id',"==", idTextInput))
            const Readstudent = await getDocs(q); 
            //ID존재 
            if(Readstudent != null){  
                Readstudent.docs.map((row, idx) =>{ 
                    //PW 일치
                    if(row.data().st_pw == pwTextInput){
                        setStudent(row.data()) //최종 student DB 저장
                        alert("success login")
                        //로그인 성공 - Home으로 이동
                        props.navigation.navigate("Home", {
                            student: idTextInput
                        }) 
                    //PW 불일치
                    }else alert("Password Mismatch")
                })
            }
        }catch(error){ console.log(error.message)}
    }

  return(
    <ImageBackground style={styles.image} source={require('../../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>

    <TouchableOpacity
      style = {styles.StationBTN}
      onPress={() => {
        props.navigation.navigate("UserInfo")
      }}>
      {/* <Image style={styles.homeImage} source={require('../../images/User.png')} resizeMode="contain"></Image> */}
      <Text style = {styles.UserText}>{user[0].u_name}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style = {styles.StationBTN2}
      onPress={() => {
        props.navigation.navigate("UserInfo")
      }}>
      <Text style = {styles.UserText}>{user[1].u_name}</Text>
    </TouchableOpacity>


    </View>
    </ImageBackground>

  )
}
export default User;