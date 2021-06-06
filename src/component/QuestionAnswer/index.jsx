import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuestionAnswer = ({ data, index }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <TouchableOpacity onPress={handleExpand} style={styles.questionContain}>
          <Text style={styles.index}>#{index}.</Text>
          <Text style={styles.questionText}>{data?.ques}</Text>
        </TouchableOpacity>
      </View>
      {expand ? (
        <View style={styles.answer}>
          <Text style={styles.answerText}>{data?.ans}</Text>
        </View>
      ) : null}
    </View>
  );
};

QuestionAnswer.propTypes = {};

export default QuestionAnswer;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    margin: 10,
    elevation: 5,
    justifyContent: "center",
    borderRadius: 2,
    padding: 4,
  },
  questionContain: {
    flexDirection: "row",
    alignItems: "center",
  },
  question: {
    padding: 10,
    flexDirection: "row",
  },
  answer: {
    padding: 10,
    borderColor: "#77777769",
    borderTopWidth: 1,
  },
  index: {
    color: "#efd81d",
    marginRight: 5,
    fontSize: 12,
  },
  questionText: {
    color: "#565656",
    fontWeight: "bold",
  },
  answerText: {
    color: "#606060",
  },
});
