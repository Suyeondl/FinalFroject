import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

/* 스테이션 리스트 스크린
// ID, 주소, 대여 여부 출력 */

const Station = (props) => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [reload, setReload] = useState(false); // 상태 변수 추가

  // 스테이션 DB 값 로드
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Station'));
        const stationData = querySnapshot.docs.map((doc) => doc.data());
        setStations(stationData);
      } catch (error) {
        console.log('데이터를 가져오지 못했습니다.', error);
      }
    };

    fetchStations();
  }, [reload]);

  // station 값 가지고 다음 페이지로 전달
  const handleStationPress = (station) => {
    props.navigation.navigate('StationInfo', { station });
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  // station_id로 검색
  const filteredStations = stations.filter((station) =>
    station.st_id.toLowerCase().includes(searchText.toLowerCase())
  );

  // 새로고침
  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Station ID로 검색"
        value={searchText}
        onChangeText={handleSearchTextChange}
      />
      <ScrollView>
        {filteredStations.map((station) => (
          <TouchableOpacity
            key={station.st_id}
            onPress={() => handleStationPress(station)}
            style={styles.stationItem}
          >
            <Text style={styles.stationId}>{station.st_id}</Text>
            <Text style={styles.stationAddress}>{station.st_address}</Text>
            {station.st_donation < 10 ? (
              <Text style={[styles.status, { color: 'red' }]}>-</Text>
            ) : (
              <Text style={[styles.status, { color: 'green' }]}>수거 필요</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      
      <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
        <ImageBackground source={require('../Reload.png')} style={{width:40, height:40}}></ImageBackground>
        {/* <Text style={styles.reloadButtonText}>새로고침</Text> */}
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  searchInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18
  },
  stationItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',  
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  stationId: {
    fontSize: 22,
    marginBottom: 5,
    color: '#6699FF',
    fontWeight: 'bold',
  },
  stationAddress: {
    fontSize: 14,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reloadButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default Station;