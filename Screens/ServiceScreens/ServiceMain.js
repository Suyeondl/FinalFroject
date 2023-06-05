import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StationReport from './StationReport'
import RentalReturnReport from './RentalReturnReport'
import AnswerList from './AnswerList'
import { StyleSheet } from 'react-native';

/* 고객센터 페이지
BottomNavigator를 통해 Station 고장 신고, 대여 반납 신고 리스트 출력
신고한 사용자 id 검색 가능 */

const Tab = createBottomTabNavigator();

const ServiceMain = () => {
  return (
    <Tab.Navigator initialRouteName="StationReport">
      <Tab.Screen name="Station 고장 신고" component={StationReport} />
      <Tab.Screen name="대여 반납 신고" component={RentalReturnReport} />
      <Tab.Screen name="답변 내역" component={AnswerList} />
    </Tab.Navigator>
  );
};

export default ServiceMain;