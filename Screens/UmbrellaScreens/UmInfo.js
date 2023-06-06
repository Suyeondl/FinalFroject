import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';

/* Umbrella 스크린에서 선택한 폐우산 정보 열람 스크린
// 우산 사진 로딩 시 로딩 아이콘 표시, 기부 날짜, 기부한 Station ID, 기부한 사용자 ID 출력 */

const UmInfo = ({ route }) => {
  const { donateUm } = route.params;
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [imageError, setImageError] = useState(false); // 이미지 로드 에러 여부

  useEffect(() => {
    // 이미지 로드 후 로딩 상태 갱신
    const imageLoadHandler = () => {
      setIsLoading(false);
    };

    // 이미지 로드 에러 처리
    const imageErrorHandler = () => {
      setIsLoading(false);
      setImageError(true);
    };

    Image.getSize(donateUm.d_image, imageLoadHandler, imageErrorHandler); // 이미지 사이즈 확인
  }, [donateUm.d_image]);

  // 폐우산 정보 출력
  return (
    <View style={styles.container}>
      <Text style={styles.label}>기부 날짜</Text>
      <Text style={styles.value}>{donateUm.d_date}</Text>

      <Text style={styles.label}>우산 사진</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6699FF" />
      ) : imageError ? (
        <Text style={styles.errorText}>이미지가 존재하지 않습니다..</Text>
      ) : (
        <Image source={{ uri: donateUm.d_image }} style={styles.image} />
      )}

      <Text style={styles.label}>Station ID</Text>
      <Text style={styles.value}>{donateUm.st_id}</Text>

      <Text style={styles.label}>기부한 사용자</Text>
      <Text style={styles.value}>{donateUm.u_id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  value: {
    fontSize: 20,
    marginTop: 5,
    backgroundColor: '#D9E5FF',
    padding: 10,
    width: '95%',
  },
  image: {
    width: 318,
    height: 318,
    marginTop: 10,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 18,
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default UmInfo;
