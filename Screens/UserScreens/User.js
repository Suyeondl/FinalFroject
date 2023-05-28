import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { styles } from '../../style';

const User = (props) => {
  const [users, setUsers] = useState([]);

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

  return (
    <View style={styles.container}>
      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity
            key={user.u_id}
            // style={styles.userCard}
            onPress={() => handleUserPress(user)}
          >
            <Text>{user.u_date}</Text>
            <Text>{user.u_email}</Text>
            <Text>{user.u_id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default User;
