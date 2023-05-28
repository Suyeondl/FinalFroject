import React from 'react';
import { View, Text } from 'react-native';

// 우산 대여 여부 수정 필요!!!!!!

/* User 페이지에서 선택한 사용자 정보 열람 페이지 */
const UserInfo = ({ route }) => {
  const { user } = route.params;
  console.log(user.u_rent)

  //사용자 우산 대여 여부 설정
  if (user.u_rent == false) {
    rentalStatus = "대여중";
  } else rentalStatus = "미대여중"

  //사용자 정보 출력
  return (
    <View>
      <Text>가입 일시: {user.u_date}</Text>
      <Text>Email: {user.u_email}</Text>
      <Text>ID: {user.u_id}</Text>
      <Text>이름: {user.u_name}</Text>
      <Text>휴대전화: {user.u_phone}</Text>
      <Text>우산 대여 여부: {user.u_rent}</Text>
    </View>
  );
};

export default UserInfo;
