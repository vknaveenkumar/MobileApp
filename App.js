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
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
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
          await AdMobInterstitial.addEventListener('interstitialDidClose', function () {
            //console.log("on close")
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
    if(category == ''){
      setEnableSearch(false)
    }else{
      setEnableSearch(true)
    }
     
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
          setEnableSearch(false)
        }}
        search={search}
        showBack={!!selectedCategory}
        enableSearch={enableSearch}
      />
      <View style={styles.content}>
        {selectedCategory ? (
          <QuestionsDisplayer
            data={loadDataBasedOnCategoryAndSearchTerm()}
            onScrollInQuestionDisplayer={onScrollInQuestionDisplayer}
            onBackPress={() => { setSelectedCaetgory(""); setEnableSearch(false) }}
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
