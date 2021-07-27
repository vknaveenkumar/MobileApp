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
            <TouchableOpacity
              style={{
                marginRight:10,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 25,
                height: 25,
                backgroundColor: '#DCDCDC',
                borderRadius: 25,
                borderColor:'#efd81d'
              }}
            >
               <Text style={styles.index}>{index}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.index}>{index}</Text> */}
            <Text style={styles.questionText}>{data?.questions}</Text>
          </TouchableOpacity>
        </View>
        {expand ? (
          <>
            <View style={styles.answerContainer}>
              {data?.answers?.map((answer, index) =>
                (<Answers key={index} answer={answer.answer} code={answer.code} index={index} />))
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
    width: "94%",
    backgroundColor: "#fff",
    margin: 8,
    elevation: 10,
    justifyContent: "flex-start",
    //borderRadius:5,
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
  questionText: {
    color: "#495663",
    fontWeight: "normal",
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
  },
  answerContainer: {
    padding: 5,
    borderColor: "#495663",
    borderTopWidth: 0.5,
    marginBottom: 10
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
    fontSize: 15,
    opacity: 0.4,
    color: "#495663",
  },
});
