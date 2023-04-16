import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 회색 F2F2F2 EDEDED
  // 로고색 D9E5FF
  
  //뷰 스타일
  mainView: {
    flex: 1,
    height: '100%',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeView: {
    flexDirection:'row'
  },

  //배경 이미지
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },

  //홈화면 이미지
  homeImage: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    left:100,
    top : -30
  },


  signUpText: {
    color: 'black'
  },


  //관리자 정보 버튼
  infoBTN: {
    position: 'absolute',
    width: '85%',
    height: 215,
    top: -30,

    backgroundColor: '#D9E5FF',

    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row'
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
  Text: {
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
  position: 'absolute',
  width: '85%',
  height: 100,
  top: 200,

  backgroundColor: '#EDEDED',

  borderRadius: 7,
  alignItems:'center',
  justifyContent:'center'
  },

  //홈 화면 버튼 (User)
  homeBTN2: {
    position: 'absolute',
    width: '40%',
    height: 200,
    left: 25,
    right: 225,
    top: 315,
  
    backgroundColor: '#EDEDED',
  
    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center'
  },

  //홈 화면 버튼 (폐우산)
  homeBTN3: {
    position: 'absolute',
    width: '40%',
    height: 200,
    right: 30,
    top: 315,

    backgroundColor: '#EDEDED',

    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center'
  },

  //홈 화면 버튼 (고객센터)
  homeBTN4: {
    position: 'absolute',
    width: '85%',
    height: 100,
    left: 25,
    right: 25,
    top: 530,

    backgroundColor: '#EDEDED',

    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center'
  },

  adminText: {
    position: 'absolute',
    fontSize:18,
    width: 200,
    height: 83,
    left: -97,
    right: 75,
    top: -40,
  },

  //홈 화면 버튼 텍스트
  nameText: {
    position: 'absolute',
    fontSize:37,
    fontWeight:'bold',
    width: 200,
    height: 83,
    left: -100,
    right: 75,
    top: -10,
    bottom: 800
  },

  idText: {
    position: 'absolute',
    fontSize:20,
    fontWeight:'bold',
    width: 200,
    height: 83,
    left: -100,
    right: 75,
    top: 70,
    bottom: 800
  },

  serialText: {
    position: 'absolute',
    fontWeight:'bold',
    width: 300,
    fontSize:20,
    height: 83,
    left: -100,
    right: 75,
    top: 100,
    bottom: 800
  },

  ServiceText: {
    fontSize: 20,
    color: 'black',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },


  StationBTN: {
    backgroundColor: '#D9E5FF',
    position: 'absolute',
    width: '85%',
    height: 100,
    top: -30,

    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row'
  },

  StationNameText: {
    position: 'absolute',
    fontSize:30,
    fontWeight:'bold',
    width: 200,
    height: 83,
    left: 15,
    right: 120,
    top: 15
  },

  StationaddressText: {
    position: 'absolute',
    fontSize:15,
    top:65,
    width: 300,
    height: 83,
    right: 120,
    left: 15
  },

  StationBTN2: {
    backgroundColor: '#D9E5FF',
    position: 'absolute',
    width: '85%',
    height: 100,
    top: 90,

    borderRadius: 7,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row'
  },

  StationNameText2: {
    position: 'absolute',
    fontSize:30,
    fontWeight:'bold',
    width: 200,
    height: 83,
    right: 120,
    top: 15,
    left: 15
  },

  StationaddressText2: {
    position: 'absolute',
    fontSize:15,
    top:65,
    width: 300,
    height: 83,
    right: 120,
    left: 15
  },
  
  UserText: {
    position: 'absolute',
    fontSize:30,
    fontWeight:'bold',
    width: 200,
    height: 83,
    right: 120,
    top: 33,
    left: 15
  },

})