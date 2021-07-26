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
} from "expo-ads-admob";
import { bannerAdId, interestialAdID } from "./src/env";
import { getData } from "./src/services";



export default function App() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [subHeader, setSubHeader] = useState(true);
  const [showAd, setShowAd] = useState(false);

  const getApiData = async () => {
    let data = await getData('@AppData')
    setData(data)
  }

  const showInterestialOnLoad = async () => {
    await AdMobInterstitial.setAdUnitID(interestialAdID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  
  }

  useEffect(() => {
    const backAction = async () => {
      try {
        if (await AdMobInterstitial.getIsReadyAsync()) {
          await AdMobInterstitial.addEventListener('interstitialDidClose', function(){ 
            console.log("on close")
             BackHandler.exitApp()
          })
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

  const onScrollInQuestionDisplayer = (status)=>{
    setSubHeader(status)
  }

  // const search = (status) =>{
  //   alert(JSON.stringify(data[category]))
  //    //const filteredData = data.
  // }
 
  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}
      />
      <TopBar
        onHomePress={() => {
          setSelectedCaetgory("");
          setSubHeader(false)
        }}
       // search = {search}
        showBack={!!selectedCategory}
        subHeader={subHeader}
      />
      <View style={styles.content}>
        {selectedCategory ? (
          <QuestionsDisplayer
            data={data?.filter((itm) => itm.category === selectedCategory)[0]}
            onScrollInQuestionDisplayer={onScrollInQuestionDisplayer}
            onBackPress={() =>{ setSelectedCaetgory(""); setSubHeader(true)}}
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
  },
  content: {
    flex: 15,
    backgroundColor: "#263842",
  },
});
