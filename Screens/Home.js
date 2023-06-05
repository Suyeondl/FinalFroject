import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { styles } from "../style";

const Home = (props) => {
  // const [adminId, setAdminId] = useState("");
  const [adminData, setAdminData] = useState(); // 불러온 관리자 정보
  const [reload, setReload] = useState(false); // 상태 변수 추가
  const adminId = props.route.params.adminId;

  const handleInfoPress = () => {
    props.navigation.navigate('Info', { adminId }); // Info 스크린으로 관리자 ID 전달
  };

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'Admin'), where('a_id', '==', adminId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const admin = doc.data();
          setAdminData(admin);
          console.log('data', admin);
        });
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };
    fetchData();
  }, [adminId, reload]);
  
  
  return(
    <ImageBackground style={styles.image} source={require('../images/MainScreen.png')} resizeMode="cover">
    <View style = {styles.mainView}>
    <TouchableOpacity
        style={styles.infoBTN}
        onPress={() => handleInfoPress(adminId)}
      >
        <View style={styles.homeView}>
        {adminData && (
            <Image style={styles.homeImage} source={{ uri: adminData.a_profile }} resizeMode="contain" />
          )}
          {/* <Image style={styles.homeImage} source={require(adminData.a_profile)} resizeMode="contain" /> */}
          <Text style={styles.adminText}>관리자</Text>

          {adminData && (
            <View>
              <Text style={styles.nameText}>{adminData.a_name}</Text>
              <Text style={styles.idText}>{adminData.a_id}</Text>
              <Text style={styles.serialText}>{adminData.a_email}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

    {/* Station 버튼  */}
    <TouchableOpacity 
      style = {styles.homeBTN}
      onPress={() => {
        props.navigation.navigate("Station")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Station.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* Service 버튼 */}
    <TouchableOpacity
      style = {styles.homeBTN4}
      onPress={() => {
        props.navigation.navigate("ServiceMain")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Service.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* User 버튼 */}
    <TouchableOpacity 
      style = {styles.homeBTN2}
      onPress={() => {
        props.navigation.navigate("User")
      }}>
      <ImageBackground style={styles.image} source={require('../images/User.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    {/* 폐우산 버튼 */}
    <TouchableOpacity
      style = {styles.homeBTN3}
      onPress={() => {
        props.navigation.navigate("DonateStation")
      }}>
      <ImageBackground style={styles.image} source={require('../images/Um.png')} resizeMode="contain">
      </ImageBackground>
    </TouchableOpacity>

    <TouchableOpacity style={test.reloadButton} onPress={handleReload}>
        <ImageBackground source={require('./Reload.png')} style={{width:40, height:40}}></ImageBackground>
        {/* <Text style={styles.reloadButtonText}>새로고침</Text> */}
      </TouchableOpacity>

    </View>
    </ImageBackground>

  )
}

const test = StyleSheet.create({
  reloadButton: {
    alignSelf: 'flex-end',
  },
});

export default Home;