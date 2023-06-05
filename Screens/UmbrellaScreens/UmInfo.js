import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { styles } from '../../style';

/* Umbrella 페이지에서 선택한 폐우산 정보 열람 페이지 */
const UmInfo = ({ route }) => {
  const { donateUm } = route.params;
  console.log(donateUm.d_num)
  console.log(donateUm.d_image)

  // 폐우산 정보 출력
  return (
    <ImageBackground style={styles.image} source={require('../../images/MainScreen.png')} resizeMode="cover">
      <View>
        <Text>{donateUm.d_date}</Text>
        <Text>{donateUm.d_num}</Text>
        <Image source={{ uri: donateUm.d_image }} style={{ width: 200, height: 200 }} />
        <Text>{donateUm.st_id}</Text>
        <Text>{donateUm.u_id}</Text>
      </View>
    </ImageBackground>
  );
};

export default UmInfo;
