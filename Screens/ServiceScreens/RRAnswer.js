import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const RRAnswer = ({ route, navigation }) => {
  const { u_id, no_additional } = route.params;
  const [answerData, setAnswerData] = useState(null);
  const [answer, setAnswer] = useState('');

  console.log(u_id, no_additional)
  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const q = query(
          collection(db, 'StationNotification'),
          where('u_id', '==', u_id),
          where('no_additional', '==', no_additional)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const answerData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAnswerData(answerData);
        } else {
          console.log('No matching documents found.');
        }
      } catch (error) {
        console.log('Failed to fetch answer data:', error);
      }
    };

    fetchAnswerData();
  }, [u_id, no_additional]);

  const handleAnswerChange = (text) => {
    setAnswer(text);
  };

  const handleSaveAnswer = async () => {
    try {
      if (answerData && answerData.length > 0) {
        const docRef = doc(db, 'StationNotification', answerData[0].id);
        await updateDoc(docRef, { answer, a_state: true });
        console.log('Answer saved successfully.');
        navigation.goBack(); // 이전 페이지로 이동
      } else {
        console.log('No matching documents found to update.');
      }
    } catch (error) {
      console.log('Failed to save answer:', error);
    }
  };

  return (
    <View style={styles.container}>
      {answerData && answerData.map((data, index) => (
        <View key={index} style={styles.answerContainer}>
          <Text style={styles.headerText}>문의자 ID: {data.u_id}</Text>
          <Text style={styles.headerText}>문의 날짜: {data.no_date}</Text>
          <Text style={styles.dateText}>문의 내용: {data.no_additional}</Text>
        </View>
      ))}
      {answerData && answerData.length > 0 && (
  <View>
    <View style={styles.typeContainer}>
      <TouchableOpacity style={styles.type}>
        <Text
          style={[
            styles.typeTextValue,
            { backgroundColor: answerData[0].no_type[0] ? '#6699FF' : '#CCCCCC' },
          ]}
        >
          대여했는데 우산을 잃어버렸어요
        </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.typeContainer}>
      <TouchableOpacity style={styles.type}>
        <Text
          style={[
            styles.typeTextValue,
            { backgroundColor: answerData[0].no_type[1] ? '#6699FF' : '#CCCCCC' },
          ]}
        >
          대여하지 않았는데 대여중이라고 나와있어요
        </Text>
      </TouchableOpacity>
    </View>

  </View>
)}

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                            
</TouchableWithoutFeedback>
  <View>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Text style={styles.answerText}>해결 방안{answerData && answerData.length > 0 ? answerData[0].answer : ''}</Text>
    </TouchableWithoutFeedback>
    </View>
  
    <TextInput
      onSubmitEditing={Keyboard.dismiss}
      value={answer}
      onChangeText={handleAnswerChange}
      placeholder="답변을 입력하세요"
      multiline
      style={styles.input}
    />
    <TouchableOpacity 
    style={styles.saveButton}
    onPress={handleSaveAnswer}>
      <Text style={styles.saveText}>저장</Text>
    </TouchableOpacity>

  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
  },
  typeActiveText: {
    fontSize: 16,
    color: 'green',
  },
  typeInactiveText: {
    fontSize: 16,
    color: 'red',
  },
  answerText: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold'
  },
  input: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
    paddingVertical: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeTextValue: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    color: 'white',
    margin: 5
  },
  type: {
    width:'103%',
  },
  saveButton: {
    backgroundColor: '#6699FF',
    borderRadius: 5,
    paddingVertical: 10,
    width: '25%',
    alignSelf: 'flex-end',
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default RRAnswer;
