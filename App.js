import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, StatusBar, View, BackHandler, Alert } from "react-native";
import Category from "./src/component/category";
import QuestionsDisplayer from "./src/component/QuestionsDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { db } from "./src/firebase-config";

export default function App() {
  const [data, setData] = useState("");
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [interstitialAd, setInterstitialAd] = useState(false)

  const answer =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const tempData = [
    {
      category: "Richard McClintock",
      qAndA: Array(10).fill({
        ques: "What is Lorem Ipsum? Why do we use it?",
        ans: answer,
        code: "codes",
      }),
    },
    {
      category: " Lorem Ipsum",
      qAndA: Array(10).fill({
        ques: "Where can I get some?",
        ans: answer,
        code: "codes",
      }),
    },
    {
      category: "on the theory of ethics",
      qAndA: Array(10).fill({
        ques: "The standard Lorem Ipsum passage, used since the 1500s",
        ans: answer,
        code: "codes",
      }),
    },
    {
      category: "it amet, consectetur",
      qAndA: Array(10).fill({
        ques: "The standard Lorem Ipsum passage, used since the 1500s",
        ans: answer,
        code: "codes",
      }),
    },
    {
      category: "Finibus Bonorum",
      qAndA: Array(10).fill({
        ques: "The standard Lorem Ipsum passage, used since the 1500s",
        ans: answer,
        code: "codes",
      }),
    },
  ];

  useEffect(async () => {


    const backAction = async () => {
      await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync().then(setInterstitialAd(true));
    };

    // const closeInterstitalAd = AdMobInterstitial.addEventListener(
    //   "interstitialDidClose",
    //   ()=>{setInterstitialAd(false)}
    // );

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    }
  }, []);


  const handleCategory = (category) => {
    setSelectedCaetgory(category);
  };



  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}
      />
      <TopBar
        onHomePress={() => setSelectedCaetgory("")}
        showBack={!!selectedCategory}
      />
      <View style={styles.content}>
        {selectedCategory ? (
          <QuestionsDisplayer
            data={
              tempData?.filter((itm) => itm.category === selectedCategory)[0]
            }
            onBackPress={() => setSelectedCaetgory("")}
          />
        ) : (
          <Category onClick={handleCategory} data={tempData} />
        )}
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        onDidFailToReceiveAdWithError={() => { alert('error') }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efd81d",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    flex: 15,
    backgroundColor: "#fff",
  },
});



 // useEffect(() => {
  //   db.ref(" ").on("value", (querySnapShot) => {
  //     let response = querySnapShot.val() || {};
  //     setData(JSON.stringify(response));
  //   });
  // }, []);