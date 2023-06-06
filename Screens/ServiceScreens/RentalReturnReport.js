import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

/* 대여 및 반납 문의 리스트 스크린
// 사용자 ID로 검색 가능 */

const RentalReturnReport = () => {
  const [stationNotifications, setStationNotifications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [reload, setReload] = useState(false); // 상태 변수 추가
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStationNotifications = async () => {
      try {
        let q = query(collection(db, 'StationNotification'), 
          where('a_state', '==', false),
          where('no_category', '==', 'RR')
        );

        if (searchText !== '') {
          q = query(q, where('u_id', '==', searchText));
        }

        const querySnapshot = await getDocs(q);
        const stationNotificationData = querySnapshot.docs.map((doc) => doc.data());
        setStationNotifications(stationNotificationData);
      } catch (error) {
        console.log('StationNotification DB를 가져오지 못했습니다.', error);
      }
    };

    fetchStationNotifications();
  }, [searchText, reload]); // reload 상태 변수 추가

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleItemPress = (u_id, no_additional) => {
    navigation.navigate('RRAnswer', { u_id, no_additional });
  };

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="사용자 ID로 검색"
        value={searchText}
        onChangeText={handleSearchTextChange}
      />

      <ScrollView>
        {stationNotifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationItem}
            onPress={() => handleItemPress(notification.u_id, notification.no_additional)}
          >
            <Text style={styles.notificationText}>{notification.u_id} 님의 문의</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

      <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
        <ImageBackground source={require('../Reload.png')} style={{width:40, height:40}}></ImageBackground>
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
  notificationItem: {
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
  notificationText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  reloadButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  reloadButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default RentalReturnReport;
