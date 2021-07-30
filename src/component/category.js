import React from "react";
import Card from "./card";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Category({ onClick, data }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((itm, index) => (
        <Card 
          onClick={() => onClick(itm.category)}
          category={itm.category}
          count={itm.QAndA.length}
          title={itm.name}
          key={index}
          index={index + 1}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom:50
    //height:'100%'
  },
});
