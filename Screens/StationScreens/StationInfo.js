import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { styles } from '../../style';

/* Station 세부 정보 열람 스크린
// ID, 대여여부, 주소, 공유 우산 대여 여부, 폐우산 기부 적재 갯수 및 station 위치 확인(지도) 버튼 */

const StationInfo = ({ route }) => {
  const { station } = route.params;
  const navigation = useNavigation();
  const [umbrellaStates, setUmbrellaStates] = useState(station.um_count_state);
  const [rentalStatus, setRentalStatus] = useState(station.st_state);
  const [reload, setReload] = useState(false); // 상태 변수 추가

  const handleStateChange = async (stateValue) => {
    try {
      const stationRef = doc(db, 'Station', station.st_id);
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
      console.log('상태값 변경에 실패했습니다.', error);
    }
  };

  const handleRentalStateChange = async () => {
    try {
      const userRef = doc(db, 'Station', station.st_id);
      await updateDoc(userRef, {
        st_rent: !rentalStatus,
      });
      setRentalStatus(!rentalStatus);
    } catch (error) {
      console.log('대여 상태 업데이트 에러', error);
    }
  };

  const handleDonationClear = async () => {
    try {
      const stationRef = doc(db, 'Station', station.st_id);
      await updateDoc(stationRef, {
        st_donation: 0,
      });
      console.log('폐우산 적재 갯수가 초기화되었습니다.');
      setReload(!reload); // 적재 갯수를 초기화했으므로 데이터를 다시 불러오기 위해 상태 변수 변경
    } catch (error) {
      console.log('폐우산 적재 갯수 초기화에 실패했습니다.', error);
    }
  };

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <View style={styles.container}>
      <View style={styles.idContainer}>
        <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.stationId}>{station.st_id}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRentalStateChange}>
          <Text
            style={[
              styles.status,
              styles.label,
              {
                color: rentalStatus ? 'green' : 'red',
              },
            ]}
          >
            {rentalStatus ? '대여 가능' : '대여 불가'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>주소</Text>
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
              backgroundColor: umbrellaStates[state].state ? '#6699FF' : '#CCCCCC',
            },
          ]}
          onPress={() => handleStateChange(state)}
        >
          <Text style={styles.stateButtonText}>{state}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.idContainer}>
        <Text style={styles.label}>폐우산 적재 갯수</Text>
        <TouchableOpacity onPress={handleDonationClear} style={styles.wasteButton}>
          <Text style={styles.wasteText}>수거</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.value}>{reload ? '0' : station.st_donation}</Text>
      </View>

    </View>
  );
};

export default StationInfo;
