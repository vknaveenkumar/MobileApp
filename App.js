import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  BackHandler,
  Image
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
  const [searchTerm, setSearchTerm] = useState('')
  const [showAd, setShowAd] = useState(false);
  const [frequencyOfAds, setFrequencyOfAds] = useState(null);

  const getApiData = async () => {
    let data = await getData('@AppData');
    setData(data.data)
    setShowAd(data.showAd)
    setFrequencyOfAds(data.frequencyOfAds)
  }


  const exitApp = () => {
    BackHandler.exitApp()
  }

  // const showInterestialOnLoad = async () => {
  //   await AdMobInterstitial.setAdUnitID(interestialAdID);
  //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });

  // }

  useEffect(() => {
    // const backAction = async () => {
    //   try {
    //     if (await AdMobInterstitial.getIsReadyAsync()) {
    //       await AdMobInterstitial.addEventListener('interstitialDidClose', function () {
    //         //console.log("on close")
    //         BackHandler.exitApp()
    //       })
    //       await AdMobInterstitial.showAdAsync()
    //     }
    //   } catch (err) {

    //   }
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    getApiData();
    // showInterestialOnLoad();

    return () => {
      //backHandler.remove();
      // AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const handleCategory = (category) => {
    setSelectedCaetgory(category);
  };

  const onScrollInQuestionDisplayer = (status) => {
    //setEnableSearch(status)
  }

  const search = (text) => {
    setSearchTerm(text)
  }

  const loadDataBasedOnCategoryAndSearchTerm = () => {
    // console.log('sssssssssssssss')
    let selectedCategoryData = data?.filter((itm) => itm.category === selectedCategory)[0]
    // console.log("ssssss",selectedCategoryData)
    let dataToView = { category: selectedCategoryData.category, name: selectedCategoryData.name, QAndA: selectedCategoryData.QAndA }
    if (searchTerm !== "") {
      const filteredDataBasedOnSearchTerm = selectedCategoryData.QAndA.filter(qanda => `${qanda.questions}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
      dataToView.QAndA = filteredDataBasedOnSearchTerm
    }

    //console.log("after converting==>",dataToView)
    return dataToView
  }

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
        }}
        search={search}
        showBack={!!selectedCategory}
        selectedCategory={selectedCategory}
        exitApp={exitApp}
      />
    
      <View style={styles.content}>
        {selectedCategory ? (
          <QuestionsDisplayer
            data={loadDataBasedOnCategoryAndSearchTerm()}
            onScrollInQuestionDisplayer={onScrollInQuestionDisplayer}
            onBackPress={() => { setSelectedCaetgory(""); setEnableSearch(false) }}
            showAd = {showAd}
            frequencyOfAds = {frequencyOfAds}
          />
        ) : (
          <Category onClick={handleCategory} data={data} />
        )}
      </View>
      {
        showAd && <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={bannerAdId}
          onDidFailToReceiveAdWithError={() => {
            //alert("error");
          }}
        />
      }

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
    backgroundColor: "#36454f",
  },
});
