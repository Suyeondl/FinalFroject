import { useState, useEffect } from "react";
import { db } from '../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';

/* SignUpScreen - 관리자 회원가입 화면 */
const SignUp = (props) => {
  const [nameTextInput, setNameTextInput] = useState(""); //회원가입 관리자 이름
  const [idTextInput, setIdTextInput] = useState(""); //회원가입 관리자 ID
  const [pwTextInput, setPwTextInput] = useState(""); //회원가입 관리자 PW
  const [emailTextInput, setEmailTextInput] = useState(""); //회원가입 관리자 
  const [phoneTextInput, setPhoneTextInput] = useState(""); //회원가입 관리자 PW
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지

  // 날짜 생성 및 DB 포맷에 맞게 저장
  const currentDate = new Date();
  const formatDate = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()}`;

  // 회원가입 입력값을 useState에 저장
  const emailChangeInput = (event) => {
    setEmailTextInput(event);
  }
  const nameChangeInput = (event) => {
    setNameTextInput(event);
  }
  const idChangeInput = (event) => {
    setIdTextInput(event);
  }
  const pwChangeInput = (event) => {
    setPwTextInput(event);
  }
  const PhoneChangeInput = (event) => {
    setPhoneTextInput(event);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // 선택한 이미지의 URI를 상태로 설정
    }
  };

  // 관리자 정보 추가하기(회원가입)
  const addAdmin = async () => {
    try {
      // 관리자 ID로 DB에서 컬렉션의 문서명 지정
      const adminDocRef = doc(db, "Admin", idTextInput);
      await setDoc(adminDocRef, {
        a_date: formatDate,
        a_email: emailTextInput,
        a_id: idTextInput,
        a_name: nameTextInput,
        a_phone: phoneTextInput,
        a_pw: pwTextInput,
        a_profile: profileImage, // 저장된 프로필 이미지
      });

      // 값 초기화
      alert("Add Admin");
      setNameTextInput("");
      setIdTextInput("");
      setPwTextInput("");
      setEmailTextInput("");
      setPhoneTextInput("");
      setProfileImage(null); // 프로필 이미지 초기화
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('이미지 라이브러리 접근 권한이 없습니다.');
        }
      }
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
            {/* 프로필 이미지 선택 버튼 */}
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.imagePickerText}>프로필 이미지 설정</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={emailTextInput}
            onChangeText={emailChangeInput}
            placeholder="E-mail"
            style={styles.input}
          />

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={nameTextInput}
            onChangeText={nameChangeInput}
            placeholder="User Name"
            style={styles.input}
          />

          <Text style={styles.label}>ID</Text>
          <TextInput
            value={idTextInput}
            onChangeText={idChangeInput}
            placeholder="User ID"
            style={styles.input}
          />

          <Text style={styles.label}>PassWord</Text>
          <TextInput
            value={pwTextInput}
            onChangeText={pwChangeInput}
            placeholder="Password"
            style={styles.input}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phoneTextInput}
            onChangeText={PhoneChangeInput}
            placeholder="Phone Number"
            style={styles.input}
          />

          {/* signup 시 회원가입 정보 전달 */}
          <TouchableOpacity style={styles.button} onPress={addAdmin}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate("Login"); }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '70%',
    height: 40,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: '#D9E5FF',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 70,
  },
  imagePickerText: {
    color: 'black',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#6699FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
};

export default SignUp;
