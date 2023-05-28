import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { styles } from '../../style';

const Station = (props) => {
  const [stations, setStation] = useState([]);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Station'));
        const stationData = querySnapshot.docs.map((doc) => doc.data());
        setStation(stationData);
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };

    fetchStation();
  }, []);

  const handleStationPress = (station) => {
    props.navigation.navigate('StationInfo', { station });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {stations.map((station) => (
          <TouchableOpacity
            key={station.st_id}
            onPress={() => handleStationPress(station)}
          >
            <Text>{station.st_id}</Text>
            <Text>{station.um_check}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Station;
