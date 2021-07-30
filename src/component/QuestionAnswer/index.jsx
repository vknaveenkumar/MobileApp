import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
//import RNFS from 'react-native-fs';
//import Share from 'react-native-share';
import { AdMobBanner } from "expo-ads-admob";
import Answers from "../Answers";
import CircleWithNumber from "../CircleWithNumber";


const QuestionAnswer = ({ data, index }) => {
  const [expand, setExpand] = useState(false);
  const viewRef = useRef(null)
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  const onShare = async () => {

    //console.log("onshsbashd",viewRef)

    const snapshot = await captureRef(viewRef, {
      result: 'data-uri',
    });

    // console.log("====>snapshot", snapshot)
    // Share.s

    if (snapshot) {

      // const shareOptions = {
      //   title: 'Share file',
      //   url: snapshot,
      //   social: Share.Social.WHATSAPP,
      //   failOnCancel: false,
      // };

      // console.log("before shareing")

      // try {
      //   const ShareResponse = await Share.open(shareOptions);
      //   console.log('ShareResponse',ShareResponse)
      // } catch (error) {
      //   console.log('Error =>', error);
      //   setResult('error: '.concat(getErrorString(error)));
      // }
    }


  };
  return (
    <>
      <ViewShot ref={viewRef} style={styles.container} >
        <View style={styles.question}>
          <TouchableOpacity
            onPress={handleExpand}
            style={styles.questionContain}
          >
            <CircleWithNumber style={[styles.circle]}><Text style={styles.index}>{index}</Text></CircleWithNumber>
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
                <Image
                  style={{ height: 20, width: 20, borderRadius: 20 / 2, margin: 5, alignSelf: 'center' }}
                  source={require('../../images/share-2.png')}
                />
              </View>
            </TouchableOpacity>

          </>
        ) : null}
      </ViewShot>
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
    backgroundColor: "#fff",
    margin: 6,
    elevation: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "flex-start",
  },
  questionContain: {
    display: 'flex',
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
    flexShrink: 1,
    lineHeight: 20,
    fontSize: 16,
    opacity: 0.9,
    fontFamily: 'monospace',
    marginLeft:10
  },
  answerContainer: {
    padding: 5,
    borderColor: "#495663",
    borderTopWidth: 0.5,
    marginBottom: 10
  },
  options: {
    margin: 3,
    fontSize: 12,
    //lineHeight: 24,
    opacity: 0.8,
  },
  index: {
    color: "#efd81d",
    fontSize: 15,
    opacity: 0.4,
    color: "#495663",
  },
  circle:{
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#DCDCDC',
    borderRadius: 25,
    borderColor: '#efd81d'
  }
});
