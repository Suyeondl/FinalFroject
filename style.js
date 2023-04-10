import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 회색 F2F2F2
  // 로고색 D9E5FF
  
  //뷰 스타일
  mainView: {
    flex: 1,
    height: '100%',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //이미지
  image: {
    flex: 1,
    width: 480,
    height: 800
  },

  //관리자 정보 버튼
  infoBTN: {
    position: 'absolute',
    width: 380,
    height: 215,
    left: 25,
    right: 25,
    top: 115,

    backgroundColor: '#D9E5FF',

    borderRadius: 15
  },

  //로그인 화면 버튼 (로그인, 회원가입)
  loginBTN: {
    backgroundColor: '#D9E5FF',
    width: 100,
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //로그인 화면 버튼 텍스트
  loginText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },

  //로그인 화면 인풋텍스트
  loginputText: {
    width: 180,
    height: 35,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#EDEDED',
    borderRadius: 3,
    margin: 5,
    alignItems: 'center',
    padding: 5
  },

  //홈 화면 버튼 (Station)
  homeBTN: {
    /* Rectangle 2 */
  position: 'absolute',
  width: 380,
  height: 100,
  left: 25,
  right: 25,
  top: 349,

  backgroundColor: '#F2F2F2',

  borderRadius: 15
  },

  //홈 화면 버튼 (User)
  homeBTN2: {
    position: 'absolute',
    width: 180,
    height: 200,
    left: 25,
    right: 225,
    top: 466,
  
    backgroundColor: '#F2F2F2',
  
    borderRadius: 15
  },

  //홈 화면 버튼 (폐우산)
  homeBTN3: {
    position: 'absolute',
    width: 180,
    height: 200,
    left: 225,
    right: 25,
    top: 466,

    backgroundColor: '#F2F2F2',

    borderRadius: 15
  },

  //홈 화면 버튼 (고객센터)
  homeBTN4: {
    position: 'absolute',
    width: 380,
    height: 100,
    left: 25,
    right: 25,
    top: 683,

    backgroundColor: '#F2F2F2',

    borderRadius: 15
  },

  //홈 화면 버튼 텍스트
  homeText: {
    fontSize: 50,
    color: 'black',
    fontStyle: 'bold',
    alignContent: 'center',
    justifyContent: 'center'
  },


})