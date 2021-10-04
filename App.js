import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  BackHandler,
  Image,
  Button,
  Text
} from "react-native";
import Category from "./src/component/category";
import Alert from "./src/component/Alert";
import QuestionsDisplayer from "./src/component/QuestionsDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner, 
} from "expo-ads-admob";
import { bannerAdId } from "./src/env";
import { getData, checkForFirstTimeUser, checkForUpdates } from "./src/services";



export default function App() {

  const [data, setData] = useState([]);
  const [splashScreen, setSplashScreen] = useState(true);


  const [firstTimeUser, setFirstTimeUser] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false)
  const [networkIssue, setNetworkIssue] = useState(false)

  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [searchTerm, setSearchTerm] = useState('')
  const [showAd, setShowAd] = useState(false);
  const [frequencyOfAds, setFrequencyOfAds] = useState(null);

  const getApiData = async () => {
    try {
      const firstTimeUserCheck = await checkForFirstTimeUser();
      //alert('1111')
      if (firstTimeUserCheck.firstTimeUserStatus) {
        setFirstTimeUser(firstTimeUserCheck);
        getJSONData('@AppData', true)  
      }
      else {
        //alert('22222')
        const checkForUpdatesCheck = await checkForUpdates();
       //alert(JSON.stringify(checkForUpdatesCheck))
        if (checkForUpdatesCheck.updateStatus) {
          setData([])
          setUpdateAlert(checkForUpdatesCheck)
        } else {
          getJSONData('@AppData', false)
        }
      }  
    } catch (err) {
      setNetworkIssue(true)
    }

  }

  const getJSONData = async (key, callApi) => {
    try {
      let data = await getData(key, callApi);
      setData(data.data)
      setShowAd(data.showAd)
      setFrequencyOfAds(data.frequencyOfAds);
      setFirstTimeUser({ firstTimeUserStatus: false, message: "" });
      setUpdateAlert({ updateStatus: false, message: "" })
      setNetworkIssue(false)
    } catch (err) {
      setNetworkIssue(true)
    }

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

    // showInterestialOnLoad();



    getApiData();

    const timer = setTimeout(() => {
      setSplashScreen(false)
    }, 5000);

    return () => {
      () => clearTimeout(timer);
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
    let selectedCategoryData = data?.filter((itm) => itm.category === selectedCategory)[0]
    let dataToView = { category: selectedCategoryData.category, name: selectedCategoryData.name, QAndA: selectedCategoryData.QAndA }
    if (searchTerm !== "") {
      const filteredDataBasedOnSearchTerm = selectedCategoryData.QAndA.filter(qanda => `${qanda.questions}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
      dataToView.QAndA = filteredDataBasedOnSearchTerm
    }
    return dataToView
  } 
  //alert(JSON.stringify(data))
  return (
    <>
      {splashScreen && <View style={styles.splashScreen}>
        {/* <Text style={{ color: 'white', fontSize: 24 }}>Splash Screen</Text> */}
        {/* <Image
          style={{ height: 180, width: 180, alignSelf: 'center' }}
          source={require('./src//images/javascript.jpg')}
        /> */}
        <Text style={{ color: 'black', fontSize: 150,fontWeight:'bold'}}>JS</Text>
        {/* <Text style={{ color: 'black', fontSize: 15 }}>Fetching Questions...</Text> */}
      </View>}

      {
        !splashScreen &&
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


            {
              !networkIssue && data.length === 0 && firstTimeUser.firstTimeUserStatus && <View style={{ margin: 15, marginTop: 50, backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 20, padding: 10 }}>{firstTimeUser.message}</Text>
              </View>
            }
            {/* {
              !networkIssue && updateAlert.updateStatus && <View style={{ margin: 15, marginTop: 50, backgroundColor: 'white' }}>
                <Text style={{ color: 'black', fontSize: 20, padding: 10 }}>{updateAlert.message}</Text>
                <View style={{ margin: 10, display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}><Button
                  onPress={() => { getJSONData('@AppData', true) }}
                  title="Download"
                  color="green"
                  style={{ width: '30%' }}
                />

                  <Button
                    onPress={() => { getJSONData('@AppData', false) }}
                    title="Not Now"
                    color="red"
                    style={{ width: '30%' }}
                  /></View>

              </View>
            } */}   
            {networkIssue &&
              <View style={{ margin: 15, marginTop: 50, backgroundColor: 'white' }}>
                <Image
                  style={{ height: 180, width: '50%', alignSelf: 'center' }}
                  source={require('./src/images/no-intenet.png')}
                />
                <Text style={{ color: 'black', fontSize: 15, padding: 10, textAlign: 'center' }}>Connect atleast once to load the data</Text>
              </View>
            }

            <Alert
              modalVisible={!networkIssue && updateAlert.updateStatus}
             // modalVisible={ true } 
              title = {"Notification"}
              message = {"We have updated out question . Please click donwload to update question"}
              buttons={[{
                text: 'Not Now',
                func: () => {getJSONData('@AppData', false) },
                styles: {
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  textTransform: 'none',
                 // backgroundColor: 'green'
                }
              },{
                text: 'Download',
                func: () => { getJSONData('@AppData', true) },
                styles: {
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  textTransform: 'none',
                  backgroundColor: '#f6d867'
                }
              }]}
            />

            {selectedCategory ? (
              <QuestionsDisplayer
                data={loadDataBasedOnCategoryAndSearchTerm()}
                onScrollInQuestionDisplayer={onScrollInQuestionDisplayer}
                onBackPress={() => { setSelectedCaetgory(""); }}
                showAd={showAd}
                frequencyOfAds={frequencyOfAds}
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

      }

    </>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    // flex: 1,
    backgroundColor: "#f6d867",
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: "#f6d867",
  },
  content: {
    flex: 15,
    backgroundColor: "#36454f",
  },
});
