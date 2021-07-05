import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import Answers from "../Answers";

const QuestionAnswer = ({ data, index }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  console.log("all my answers==>", data.answers)
  return (
    <>
      <View style={styles.container}>
        <View style={styles.question}>
          <TouchableOpacity
            onPress={handleExpand}
            style={styles.questionContain}
          >
            {/* <Text style={styles.index}>#{index}</Text> */}
            <Text style={styles.questionText}>{data?.questions}</Text>
          </TouchableOpacity>
        </View>
        {expand ? (
          <>
            <View style={styles.answer}>
              {data?.answers?.map((answer, index) =>
                (<Answers key={index} style={styles.answerText} answer={answer.answer} index={index} />))
              }
            </View>
            <View style={styles.options}>
              <Text style={styles.options}>Options</Text>
            </View>
          </>
        ) : null}
      </View>
      {index % 10 === 0 ? (
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => { }}
        />
      ) : null}
    </>
  );
};
{/* <View key={item.id} style={styles.card}>
      <Text style={styles.fullNameText}>{item.questions}</Text>
    </View> */}
QuestionAnswer.propTypes = {};

export default QuestionAnswer;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    margin: 10,
    elevation: 10,
    justifyContent: "center",
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius:15,
    //padding: 5,
    overflow: "hidden",
  },
  questionContain: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  question: {
    padding: 10,
    flexDirection: "row",
  },
  answer: {
    padding: 10,
    borderColor: "#495663",
    borderTopWidth: 0.5,
  },
  questionText: {
    color: "#495663",
    fontWeight: "bold",
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
  answerText: {
    color: "#495663",
    fontSize: 12,
    lineHeight: 24,
    opacity: 0.8,
    textAlign: "justify",
  },
  options:{
    color: "#495663",
    fontSize: 12,
    lineHeight: 24,
    opacity: 0.8,
    //borderWidth:0.5,
    textAlign:'center',
   // textAlign: "justify",
    backgroundColor:'#DCDCDC'
  },
  index: {
    color: "#efd81d",
    marginRight: 5,
    fontSize: 40,
    position: "absolute",
    top: -20,
    right: -24,
    fontWeight: "bold",
    opacity: 0.4,
  },
});
