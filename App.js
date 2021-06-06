import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Category from './src/component/category'
import { db } from './src/firebase-config'

export default function App() {

  const [data, setData] = useState('');
  const [showAnswer,setShowAnswer] = useState(false)

  useEffect(() => {
    db.ref(' ').on('value', querySnapShot => {
      let response = querySnapShot.val() ? querySnapShot.val() : {};
      setData(JSON.stringify(response))
    });
  }, [])

  const handleCategory = (category) => {
      alert(category)
  }

  return (
    <View style={styles.container}>
      <Category onClick={handleCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: "20%",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
