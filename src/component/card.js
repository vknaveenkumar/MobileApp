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
import CircleWithNumber from "../component/CircleWithNumber";

export default function Card({ title, category, onClick, index,count }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View>

        <ImageBackground imageStyle={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }} source={require('../images/javascript.jpg')} resizeMode='cover' style={styles.image}>

        </ImageBackground>

      </View>
      <View style={styles.count}>
        <CircleWithNumber style={[styles.circle]}><Text styles={styles.count}>{count}</Text></CircleWithNumber>
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleFont}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 30,
    marginTop: 40,
    elevation: 20,
    height: 120,
    width: '33%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  image: {
    width: null,
    height: "100%",
  },
  cardTitle: {
    padding: 2,
    color: "#495663",
    fontSize: 15,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    minHeight: 35,
    overflow: 'hidden',
    fontWeight: "bold",
    opacity: 1,
    padding: 5,
    backgroundColor: 'grey',
    width: '100%',
    flex:1,
    justifyContent:'center',
    alignContent:'center'
   
  },
  cardTitleFont: {
    color: 'white',
    //fontWeight: 'bold',
    textAlign: 'center',
  },
  count: {
    position: 'absolute',
    right:5,
    top:5,
  },
  circle:{
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: '#efd81d'
  }
});
