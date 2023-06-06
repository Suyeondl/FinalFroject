import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

/* Main 홈화면
// 관리자 정보(이름, ID, Email, 프로필사진) 출력 / 기능 선택 스크린 */

const Home = (props) => {
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
  
  return (
    <View style={styles.container}>

      {/* 화면 상단 로고 : 새로고침 버튼 */}
      <View>
        <TouchableOpacity style={styles.adminButton} onPress={handleReload}>
          <View style={styles.adminImageContainer}>
            <Image
            style={styles.adminBackgroundImage} 
            source={require('../images/PURE.jpg')}></Image>
          </View>
        </TouchableOpacity>
      </View>

      {/* 관리자 정보 버튼 */}
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={() => handleInfoPress(adminId)} style={styles.infoButton}>
          <View style={styles.innerContainer}>
          {adminData && (
            <View style={styles.textContainer}>
              <Text style={{fontSize:30, fontWeight:'bold', paddingTop: 20}}>{adminData.a_name}</Text>
              <Text>                </Text>
              <Text>                </Text>
              <Text style={{fontSize:20, paddingVertical:10}}>{adminData.a_id}</Text>
              <Text style={{fontSize:20}}>{adminData.a_email}</Text>
            </View>
          )}
          {adminData && (
            <Image source={{ uri: adminData.a_profile }} style={styles.profileImage} />
          )}
          </View>
        </TouchableOpacity>
      </View>

      {/* 폐우산 정보 버튼 */}
      <TouchableOpacity onPress={() => props.navigation.navigate("Umbrella")} style={styles.button2}>
          <ImageBackground source={require('../images/Um.png')} style={styles.buttonBackgroundImage} />
        </TouchableOpacity>

      {/* 버튼 그룹 */}
      <View style={styles.buttonGroup}>
        {/* 스테이션 정보 확인 버튼 */}
        <TouchableOpacity onPress={() => props.navigation.navigate("Station")} style={styles.button}>
          <ImageBackground source={require('../images/Station.png')} style={styles.buttonBackgroundImage} />
        </TouchableOpacity>
        {/* 사용자 정보 확인 버튼 */}
        <TouchableOpacity onPress={() => props.navigation.navigate("User")} style={styles.button}>
          <ImageBackground source={require('../images/User.png')} style={styles.buttonBackgroundImage} />
        </TouchableOpacity>
      </View>
      
      {/* 고객센터 버튼 */}
      <TouchableOpacity onPress={() => props.navigation.navigate("ServiceMain")} style={styles.button2}>
          <ImageBackground source={require('../images/Service.png')} style={styles.buttonBackgroundImage} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminImageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  adminButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminBackgroundImage: {
    resizeMode: 'contain',
    width: 300,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 25
  },
  buttonGroup: {
    flexDirection: 'row',
    padding:5
    // flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  button: {
    width: '41%',
    height: 190,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button2: {
    width: '85%',
    height: '12%',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  infoButton: {
    alignItems: 'flex-end',
    marginBottom: 20,
    backgroundColor: '#D9E5FF',
    width: '100%',
    alignContent:'center',
  },
  infoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#D9E5FF',
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'flex-start',
  },
});

export default Home;
