import React, { useEffect, useState,  useRef,} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
// npm i react-native-maps
import * as Location from 'expo-location';
//fire store
//npx expo install firebase
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

/* Station 위치, 내 위치 지도 출력 스크린 */

const Map = ({ navigation }) => {
  const [mapRegion, setmapRegion] = useState({ //나의 위치
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
  });
  //firestor 연동
  const [stations, setStations] = useState();
  //에니메이션으로 이동
  const mapRef = React.useRef(null);
  const [region, setRegion] = React.useState();


  // 드래그 해서 위치의 위도경도 가져오기
  const mapRegionChangehandle = (region) => {
      setRegion(region)
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getDocs(collection(db, "Station")) // Station이라는 테이블 명
        setStations(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌
        
      } catch (error) {
        console.log('eerror', error.message)
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); //현재 위치 가져오기
      console.log('location' )
      setmapRegion({ //현재 위치 set
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
    })();
  }, []);

  // 이동하기
  const onDetail = (lat, lon) => { // 반납 가능 우산 개수, 대여 가능 우산 개수 계산
    setmapRegion({ //현재 위치
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
    mapRef.current.animateToRegion({ //해당 위치로 지도 이동
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <MapView
          style={styles.map}
          // region={mapRegion}
          // initialRegion={{mapRegion}}
          initialRegion={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          ref={mapRef}
          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval = 
          onUserLocationChange={(e) => {
            setmapRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
          onRegionChange={mapRegionChangehandle}
        >

          {
            stations?.map((e, idx) => {
              var rentalCount = 0
              var returnCount = 0
              // DB에 있는 데이터 값
              // {"1": {"angle": 0, "state": true}, "2": {"angle": 90, "state": false}, ...}

              for (var i=0; i<Object.keys(e.um_count_state).length; i++) { // um_count_state의 길이만큼 반복
                // key값이 string이라서 변환 후 state읽기
                if (e.um_count_state[String(i+1)].state) { // true이면 대여 가능
                  rentalCount++; 
                } else {
                  returnCount++;
                }
              }

              return (
                <Marker
                  key={idx}
                  coordinate={{ latitude: e.st_p_x, longitude: e.st_p_y }}
                  onPress={() => {
                    console.log(e)
                    onDetail(e.st_p_x, e.st_p_y)
                  }}
                >
                  <Callout style={{ width: Dimensions.get('screen').width * 0.6 }}>

                    <View style={{ justifyContent: 'center', padding: 5 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6699FF' }}>{e.st_id}</Text>
                      <Text >{e.st_address}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: 'bold', }}>대여 가능 우산 갯수 : {rentalCount}</Text>
                      <Text style={{ fontSize: 13, fontWeight: 'bold', }}>반납 가능 우산 갯수 : {returnCount}</Text>
                    </View>

                    <View>


                    </View>
                  </Callout>
                </Marker>
              )
            })
          }        
        </MapView>

        <View>
          
        </View>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    padding: 5,
    height: "10%",
    flexDirection: 'row',
    widh: "100%",
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  weathertab: {
    width: '100%',
    height: Dimensions.get('window').height * 0.08,
    backgroundColor: 'white',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closemap:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    width: '40%'
  },
  qrscanner:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#5775D9',
    width: '40%',
    flexDirection:'row'
  },
  mylocation:{
    backgroundColor:'white',
    width:50,
    height:50,
  }
});

export default Map;

// import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import MapView from 'react-native-maps';
// import * as Location from 'expo-location';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';
// import { useRoute } from '@react-navigation/native';

// const Map = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [stations, setStations] = useState([]);
//   const route = useRoute();
//   const { st_address } = route.params;

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//     };

//     (async () => {
//       try {
//         const data = await getDocs(collection(db, 'Station'));
//         setStations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//       } catch (error) {
//         console.log('Error fetching stations:', error);
//       }
//     })();

//     requestLocationPermission();
//   }, []);

//   const stationLocation = stations.find(station => station.st_address === st_address);

//   return (
//     <View style={{ flex: 1 }}>
//       {userLocation && (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           <MapView.Marker
//             coordinate={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//             }}
//             title="현재 위치"
//           />

//           {stationLocation && (
//             <MapView.Marker
//               coordinate={{
//                 latitude: stationLocation.latitude,
//                 longitude: stationLocation.longitude,
//               }}
//               title={st_address}
//             />
//           )}
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default Map;