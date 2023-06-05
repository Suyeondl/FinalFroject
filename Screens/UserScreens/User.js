import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const User = (props) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'User'));
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userData);
      } catch (error) {
        console.log('데이터 가져오기 실패:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    props.navigation.navigate('UserInfo', { user });
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredUsers = users.filter((user) =>
    user.u_id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="사용자 ID로 검색"
        value={searchText}
        onChangeText={handleSearchTextChange}
      />
      <ScrollView>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.u_id}
            onPress={() => handleUserPress(user)}
            style={styles.userItem}
          >
            <Text style={styles.userId}>{user.u_id}</Text>
            <Text style={styles.userEmail}>{user.u_email}</Text>
            <Text style={styles.userDate}>{user.u_date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18
  },
  userItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',  
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userId: {
    fontSize: 22,
    marginBottom: 5,
    color: '#6699FF',
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 5,
  },
  userDate: {
    fontSize: 14,
    color: '#666666',
  },
});

export default User;
