import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

/* 관리자 세부 정보 열람 스크린
// 로그인 한 관리자에 대한 DB 값 불러와 출력 / 프로필 사진, 이름, 이메일 수정 가능 */

const Info = ({ route }) => {
  const { adminId } = route.params;
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [editedName, setEditedName] = useState(''); // 수정된 이름 값
  const [editedEmail, setEditedEmail] = useState(''); // 수정된 이메일 값
  const [editedProfile, setEditedProfile] = useState(null); // 수정된 프로필 값

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const adminDoc = doc(db, 'Admin', adminId);
        const adminSnapshot = await getDoc(adminDoc);
        if (adminSnapshot.exists()) {
          setAdmin(adminSnapshot.data());
          setEditedName(adminSnapshot.data().a_name);
          setEditedEmail(adminSnapshot.data().a_email);
          setEditedProfile(adminSnapshot.data().a_profile);
        } else {
          console.log('해당하는 관리자 정보가 없습니다.');
        }
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };
  
    fetchInfo();
  }, [adminId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const adminDocRef = doc(db, 'Admin', adminId);
      await setDoc(adminDocRef, {
        ...admin,
        a_name: editedName,
        a_email: editedEmail,
        a_profile: editedProfile,
      });
      setAdmin({ ...admin, a_name: editedName, a_email: editedEmail, a_profile: editedProfile });
      setEditMode(false);
      console.log('정보가 수정되었습니다.');
    } catch (error) {
      console.log('정보 수정 실패:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setEditedProfile(result.assets[0].uri); // 선택한 이미지의 URI를 상태로 설정
    }
  };

  if (!admin) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../images/InfoScreen.png')} resizeMode='cover' style={styles.imageBackground}>
        
        <Text style={styles.label}>프로필 사진</Text>
        <View style={styles.profileContainer}>
          {editMode ? (
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Image source={{ uri: editedProfile || admin.a_profile }} style={styles.profileImage} />
              {/* <Text style={styles.buttonText}>사진 선택</Text> */}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button}>
            <Image source={{ uri: editedProfile || admin.a_profile }} style={styles.profileImage} />
            </TouchableOpacity>
          
          )}
        </View>
        
        <Text style={styles.label}>가입 일시</Text>
        <Text style={styles.value}>{admin.a_date}</Text>

        <Text style={styles.label}>사용자 이름</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="사용자 이름"
          />
        ) : (
          <Text style={styles.value}>{admin.a_name}</Text>
        )}

        <Text style={styles.label}>사용자 이메일</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="사용자 이메일"
          />
        ) : (
          <Text style={styles.value}>{admin.a_email}</Text>
        )}

        {editMode ? (
          <TouchableOpacity style={styles.editButton} onPress={handleSave}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  imageBackground: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
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
    marginBottom:10
  },
  input: {
    fontSize: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
  },
  button: {
    backgroundColor: '#6699FF',
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#6699FF',
  },
  editButton: {
    backgroundColor: '#6699FF',
    borderRadius: 5,
    marginTop: '62%',
    paddingVertical: 10,
    width: '25%',
    alignSelf: 'flex-end',
  },
});

export default Info;
