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
import { bannerAdId, interestialAdID } from './src/env'
import { getData } from './src/services';


export default function App() {
  const [data, setData] = useState("");
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [interstitialAd, setInterstitialAd] = useState(false)

  const getApiData = async() =>{
     let data = await getData('AppData') 
     setData(JSON.parse(JSON.stringify(data)))
  }

  useEffect(() => {
    const backAction = async () => {
      await AdMobInterstitial.setAdUnitID(interestialAdID);
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

    getApiData()

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
              data?.filter((itm) => itm.category === selectedCategory)[0]
            }
            onBackPress={() => setSelectedCaetgory("")}
          />
        ) : (
          <Category onClick={handleCategory} data={data} />
        )}
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={bannerAdId}
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


