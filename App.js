import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from './src/firebase-config'

export default function App() {

  const [data, setData] = useState("")

  useEffect(() => {
    db.ref('/reactjs').on('value', querySnapShot => {
      let response = querySnapShot.val() ? querySnapShot.val() : {};
      setData(JSON.stringify(response))
    });
  }, [])


  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AA00BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
