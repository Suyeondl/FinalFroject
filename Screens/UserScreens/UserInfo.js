import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/* 사용자 세부 정보 열람 페이지
// 프로필 사진, 가입 일시, Email, ID, 이름, 휴대전화번호, 우산 대여 상태 출력 */

const UserInfo = ({ route }) => {
  const { user } = route.params;
  const [rentalStatus, setRentalStatus] = useState(user.u_rent);

  // 사용자의 대여 상태 변경
  const handleStateChange = async (rentalStatus) => {
    console.log(rentalStatus)
    try {
      const userRef = doc(db, 'User', user.u_id);
      await updateDoc(userRef, {
        u_rent: !rentalStatus
      })
      setRentalStatus(!rentalStatus);
    } catch (error) {
      console.log("대여 상태 업데이트 에러", error)
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>  사용자 정보</Text>
      <View style={styles.profileContainer}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: user.u_profile }} resizeMode="contain" />
      </View>

      <Text style={styles.label}>  가입 일시</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{user.u_date}</Text>
      </View>

      <Text style={styles.label}>  Email</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{user.u_email}</Text>
      </View>

      <Text style={styles.label}>  ID</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{user.u_id}</Text>
      </View>

      <Text style={styles.label}>  이름</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{user.u_name}</Text>
      </View>

      <Text style={styles.label}>  휴대전화</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{user.u_phone}</Text>
      </View>

      <View style={styles.rentalContainer}>
        <Text style={styles.label}>  우산 대여 상태 :</Text>
        <TouchableOpacity onPress={() => handleStateChange(rentalStatus)}>
           <Text style={[styles.rentalStatus, styles.label,
          {
              color: rentalStatus
              ? 'green' : 'red',
          }
          ]}>{rentalStatus ? '대여 중' : '미대여 중'}</Text>
        </TouchableOpacity>
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    // alignItems:'center',
    // justifyContent:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6699FF',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
    // marginBottom: 10,
  },
  rentalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#6699FF',
    fontWeight: 'bold',
    marginRight: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
  },
  rentalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentalStatus: {
    color: 'green',
    fontWeight: 'bold'
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  value: {
    fontSize: 20,
    marginTop: 5,
    backgroundColor: '#D9E5FF',
    padding: 10,
    width: '95%'
  },
  profileContainer: {
    alignItems: 'center'
  },
  rentalvalue: {
    fontSize: 25,
    marginTop: 5,
    padding: 10,
    width: '95%',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  }
});

export default UserInfo;
