import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Animated,
  Text
} from 'react-native';
import QuestionAnswer from "../QuestionAnswer";
//import faker from 'faker';

const HEADER_MAX_HEIGHT = 275;
const HEADER_MIN_HEIGHT = StatusBar.currentHeight;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 100;



const QuestionsDisplayer = ({ data, onBackPress, onScrollInQuestionDisplayer, showAd, frequencyOfAds }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showNavigation, setShowNavigation] = useState(true)
  //alert(frequencyOfAds)

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });


  const renderListItem = (item, key) => (
    <QuestionAnswer data={item} key={key} index={key + 1} showAd={showAd} frequencyOfAds={frequencyOfAds} />
  );


  return (
    <SafeAreaView style={styles.saveArea}>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 30, elevation: 1000 }}
        style={{ elevation: 1 }}
        scrollEventThrottle={16}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
              listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y
                if (offsetY > HEADER_MAX_HEIGHT) {
                  setShowNavigation(false)
                  onScrollInQuestionDisplayer(true) //to enable search
                } else {
                  setShowNavigation(true)
                  onScrollInQuestionDisplayer(false)
                }
              },
            })
        }>
        {data?.QAndA.length > 0 ? <Animated.View >{data?.QAndA.map(renderListItem)}</Animated.View> :
          <Animated.View style={{ backgroundColor: 'grey', marginTop: "50%", width: '85%', alignSelf: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', padding: 30, textAlign: 'center' }}>No Result For The Given Search</Text>
          </Animated.View>}

        {/* <Animated.View >{data?.QAndA.map(renderListItem)}</Animated.View> */}
      </Animated.ScrollView>

      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>


        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={require('../../images/javascript3.jpg')}
        />

        {/* {showNavigation && 
           <TouchableOpacity onPress={onBackPress}><Image
                  style={styles.backButton}
                  onPress={onBackPress}
                  source={require('../../images/back.png')}
                /></TouchableOpacity>
                } */}

      </Animated.View>

    </SafeAreaView>
  );
}

export default QuestionsDisplayer

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F0DB4F',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 15,
    height: 20, width: 20, borderRadius: 20 / 2,
  },
  //navigation old style
  categoryContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
  },
  category: {
    margin: 0,
    elevation: 5,
    justifyContent: "center",
    // borderRadius: 2,
    padding: 5,
    fontSize: 16,
    textAlign: "center",
    color: "#e0c55e",
  },
});