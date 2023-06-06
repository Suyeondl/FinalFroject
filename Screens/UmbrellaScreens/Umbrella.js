import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, TextInput } from "react-native";
import { db } from '../../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';

/* 폐우산 리스트 출력 스크린
DnateStation 스크린에서 선택한 Station에 기부되어있는 폐우산 리스트 출력
기부 날짜, 기부한 User명 표시 */

const Umbrella = (props) => {
  const [donateUm, setDonateUm] = useState([]);
  const [filteredDonateUm, setFilteredDonateUm] = useState([]);

  const { station } = props.route.params; // 선택한 station 정보 가져오기
  const st_id = station.st_id; // 선택한 station의 st_id

  useEffect(() => {
    const fetchDonateUm = async () => {
      try {
        const q = query(collection(db, 'Donation'), where('st_id', '==', st_id));
        const querySnapshot = await getDocs(q);
        const donateUmData = querySnapshot.docs.map((doc) => doc.data());
        setDonateUm(donateUmData);
        setFilteredDonateUm(donateUmData); // Initialize filteredDonateUm with all donateUmData
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };

    fetchDonateUm();
  }, [st_id]);

  const handleUmPress = (donateUm) => {
    props.navigation.navigate('UmInfo', { donateUm });
  };

  const handleSearchTextChange = (text) => {
    const filteredData = donateUm.filter((donateUm) =>
      donateUm.u_id.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDonateUm(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="사용자 ID로 검색"
        onChangeText={handleSearchTextChange}
      />
      <ScrollView>
        {filteredDonateUm.map((donateUm) => (
          <TouchableOpacity
            key={donateUm.d_num}
            onPress={() => handleUmPress(donateUm)}
            style={styles.stationItem}
          >
            <Text style={styles.stationId}>{donateUm.d_date}</Text>
            <Text style={{fontSize:18}}>{donateUm.u_id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  stationItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationId: {
    fontSize: 22,
    color: '#6699FF',
    fontWeight: 'bold',
  },
});

export default Umbrella;
