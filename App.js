import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  StatusBar,
  View,
  BackHandler,
} from "react-native";
import Category from "./src/component/category";
import QuestionsDisplayer from "./src/component/QuestionsDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { db } from "./src/firebase-config";
import { bannerAdId, interestialAdID } from "./src/env";
import { getData } from "./src/services";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [showAd, setShowAd] = useState(false);

  const getApiData = async () => {
    let data = await getData('@AppData')
    setData(data)
  }

  const showInterestialOnLoad = async () => {
    await AdMobInterstitial.setAdUnitID(interestialAdID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.addEventListener('interstitialDidClose', function(){
       BackHandler.exitApp()
    })
  }

  useEffect(() => {
    const backAction = async () => {
      try {
        if (await AdMobInterstitial.getIsReadyAsync()) {
          await AdMobInterstitial.showAdAsync()
        }
      } catch (err) {

      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    getApiData();
    showInterestialOnLoad();

    return () => {
      backHandler.remove();
      AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const handleCategory = (category) => {
    setSelectedCaetgory(category);
  };

  console.log("my category",selectedCategory)
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
            data={data?.filter((itm) => itm.category === selectedCategory)[0]}
            onBackPress={() => setSelectedCaetgory("")}
          />
        ) : (
          <Category onClick={handleCategory} data={data} />
        )}
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={bannerAdId}
        onDidFailToReceiveAdWithError={() => {
          //alert("error");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6d867",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    flex: 15,
    backgroundColor: "#f4f4f4",
  },
});
