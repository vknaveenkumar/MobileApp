import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { } from './javascript.jpg'

export default function Card({ title, category, onClick, index }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <ImageBackground imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }} source={require('./javascript.jpg')} resizeMode='cover' style={styles.image}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTitleFont}> Questions: 19 </Text>
          <Text style={styles.cardTitleFont}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 30,
    elevation: 20,
    height: 150,
    //flexBasis: '35%',
    width:'33%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  image: {
    width: null,
    height: "100%",
  },
  cardTitle: {
    padding: 5,
    paddingLeft: 10,
    color: "#495663",
    fontSize: 15,
    fontWeight: "bold",
    opacity: 0.5,
   // backgroundColor: '#F0DB4F', //javascript yellow
    backgroundColor: '#696969', 
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  cardTitleFont:{
    color:'white',
    fontWeight:'bold'
  }
});
