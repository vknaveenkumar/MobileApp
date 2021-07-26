import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Share } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import Answers from "../Answers";

const QuestionAnswer = ({ data, index }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  const onShare = async () => {
    //alert('sharing')
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      //alert('sharinssssg',result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.question}>
          <TouchableOpacity
            onPress={handleExpand}
            style={styles.questionContain}
          >
            {/* <Text style={styles.index}>{index}</Text> */}
            <Text style={styles.questionText}>{data?.questions}</Text>
          </TouchableOpacity>
        </View>
        {expand ? (
          <>
            <View style={styles.answerContainer}>
              {data?.answers?.map((answer, index) =>
                (<Answers key={index} answer={answer.answer} index={index} />))
              }
            </View>
            <TouchableOpacity onPress={onShare}>
              <View style={styles.options} >
                <Text style={styles.options}>SHARE</Text>
              </View>
            </TouchableOpacity>
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

QuestionAnswer.propTypes = {};

export default QuestionAnswer;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    margin: 10,
    elevation: 10,
    justifyContent: "center",
    //borderRadius:5,
    padding: 5,
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
  questionText: {
    color: "#495663",
    fontWeight: "bold",
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
  answerContainer: {
    padding: 10,
    borderColor: "#495663",
    borderTopWidth: 0.5,
  },
  options: {
    color: "#495663",
    fontSize: 12,
    lineHeight: 24,
    opacity: 0.8,
    textAlign: 'center',
    backgroundColor: '#DCDCDC'
  },
  index: {
    color: "#efd81d",
    fontSize: 20,
    opacity: 0.4,
    backgroundColor: 'yellow',
    // marginRight:5,
    color: "#495663",
  },
});
