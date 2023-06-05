import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DonateStation = (props) => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Station'));
        const stationData = querySnapshot.docs.map((doc) => doc.data());
        setStations(stationData);
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };

    fetchStations();
  }, []);

  const handleStationPress = (station) => {
    props.navigation.navigate('Umbrella', { station });
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredStations = stations.filter((station) =>
    station.st_id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색"
        value={searchText}
        onChangeText={handleSearchTextChange}
      />
      <ScrollView>
        {filteredStations.map((station) => (
          <TouchableOpacity
            key={station.st_id}
            onPress={() => handleStationPress(station)}
            style={styles.stationContainer}
          >
            <Text style={styles.stationId}>{station.st_id}</Text>
            <Text style={styles.stationDonation}>폐우산 스택: {station.st_donation}개</Text>
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
    fontSize: 18
  },
  stationContainer: {
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
    fontWeight: 'bold',
    color: '#6699FF',
  },
  stationDonation: {
    fontSize: 16,
    color: '#333333',
  },
});

export default DonateStation;
