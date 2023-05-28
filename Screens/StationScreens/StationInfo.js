import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 우산 대여 여부 수정 필요!!!!!!

/* User 페이지에서 선택한 사용자 정보 열람 페이지 */
const StationInfo = ({ route }) => {
  const { station } = route.params;

  //사용자 정보 출력
  return (
    <View>
      <Text>{station.st_id}</Text>
      <Text>주소: {station.st_address}</Text>
      <Text>폐우산 수거 상태: {station.um_check}</Text>
      {/* state에 따라 활성화, 비활성화 */}

      {/* 지도 출력 */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("StationMap")
        }}>
        <Text>Station 위치 확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StationInfo;
