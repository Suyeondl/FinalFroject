import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { styles } from '../../style';

const StationInfo = ({ route }) => {
  const { station } = route.params;
  const navigation = useNavigation();
  const [umbrellaStates, setUmbrellaStates] = useState(station.um_count_state);

  const handleStateChange = async (stateValue) => {
    try {
      const stationRef = doc(db, 'Station', station.st_id);
      console.log(stationRef)
      await updateDoc(stationRef, {
        um_count_state: {
          ...umbrellaStates,
          [stateValue]: {
            ...umbrellaStates[stateValue],
            state: !umbrellaStates[stateValue].state,
          },
        },
      });
      setUmbrellaStates((prevState) => ({
        ...prevState,
        [stateValue]: {
          ...prevState[stateValue],
          state: !prevState[stateValue].state,
        },
      }));
      console.log('상태값이 변경되었습니다.');
    } catch (error) {
      console.log('상태값 변경 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.idContainer}>
        <Text style={styles.stationId}>{station.st_id}</Text>
        {station.st_state ? (
              <Text style={[styles.status, { color: 'green' }]}>대여 가능</Text>
            ) : (
              <Text style={[styles.status, { color: 'red' }]}>대여 불가</Text>
            )}
      </View>

      <Text style={styles.label}>  주소</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{station.st_address}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Map', { st_address: station.st_address });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Station 위치 확인</Text>
      </TouchableOpacity>


      <Text style={styles.label}>공유 우산</Text>
      {Object.keys(umbrellaStates).map((state) => (
        <TouchableOpacity
          key={state}
          style={[
            styles.stateButton,
            {
              backgroundColor: umbrellaStates[state].state 
              ? '#6699FF' : '#CCCCCC',
            },
          ]}
          onPress={() => handleStateChange(state)}
        >
          <Text style={styles.stateButtonText}>{state}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>폐우산 적재 갯수</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.value}>{station.st_donation}</Text>
      </View>
      
    </View>
  );
};

export default StationInfo;
