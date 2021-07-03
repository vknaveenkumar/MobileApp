import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuestionAnswer from "../QuestionAnswer";

const QuestionsDisplayer = ({ data, onBackPress }) => {
  console.log("11===>",data)
  return (
    <View>
      <View style={styles.categoryContain}>
        <TouchableOpacity
          onPress={onBackPress}
          style={{ ...styles.thridWidth, textAlign: "left" }}
        >
          <Text style={{ ...styles.title, textAlign: "left" }}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.category}>{data?.category}</Text>
        <TouchableOpacity onPress={onBackPress} style={styles.thridWidth}>
          <Text style={{ ...styles.title, textAlign: "right" }}>
            {data?.qAndA?.length} Questions
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {data?.QAndA?.map((quesAns, key) => (
          <QuestionAnswer data={quesAns} key={key} index={key + 1} />
        ))}
      </ScrollView>
    </View>
  );
};

QuestionsDisplayer.propTypes = {};

export default QuestionsDisplayer;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 75,
  },
  thridWidth: {
    width: "33%",
    height: 40,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    paddingLeft: 12,
    paddingRight: 12,
    color: "#495663",
  },
  categoryContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e8e8e8",
    padding: 10,
  },
  category: {
    margin: 0,
    // elevation: 5,
    justifyContent: "center",
    // borderRadius: 2,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#e0c55e",
  },
});
