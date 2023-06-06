import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';

/* Umbrella 스크린에서 선택한 폐우산 정보 열람 스크린 */

const UmInfo = ({ route }) => {
  const { donateUm } = route.params;
  console.log(donateUm.d_num)
  console.log(donateUm.d_image)

  // 폐우산 정보 출력
  return (
        <View style={styles.container}>
        <Text style={styles.label}>기부 날짜</Text>
        <Text style={styles.value}>{donateUm.d_date}</Text>

        <Text style={styles.label}>우산 사진</Text>
        <Image source={{ uri: donateUm.d_image }} style={{ width: 300, height: 300 }} />
        
        <Text style={styles.label}>Station ID</Text>
        <Text style={styles.value}>{donateUm.st_id}</Text>

        <Text style={styles.label}>기부한 사용자</Text>
        <Text style={styles.value}>{donateUm.u_id}</Text>
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
    // marginBottom: 10,
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
})

export default UmInfo;
