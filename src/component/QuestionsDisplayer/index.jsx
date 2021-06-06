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
  return (
    <View>
      <View style={styles.categoryContain}>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.title}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.category}>{data?.category}</Text>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.title}>1/4</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data?.qAndA?.map((quesAns, key) => (
          <QuestionAnswer data={quesAns} key={key} index={key + 1} />
        ))}
      </ScrollView>
    </View>
  );
};

QuestionsDisplayer.propTypes = {};

export default QuestionsDisplayer;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
    paddingLeft: 12,
    paddingRight: 12,
  },
  categoryContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#77777777",
  },
  category: {
    margin: 0,
    // elevation: 5,
    justifyContent: "center",
    // borderRadius: 2,
    padding: 10,
    textAlign: "center",
  },
});
