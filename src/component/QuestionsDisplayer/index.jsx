import React, { useRef, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
  Text,
  Animated,
} from 'react-native';
import QuestionAnswer from "../QuestionAnswer";
//import faker from 'faker';

const HEADER_MAX_HEIGHT = 275;
const HEADER_MIN_HEIGHT = StatusBar.currentHeight;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 100;



const QuestionsDisplayer = ({ data, onBackPress, onScrollInQuestionDisplayer }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showNavigation, setShowNavigation] = useState(true)

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
    <QuestionAnswer data={item} key={key} index={key + 1} />
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
                  onScrollInQuestionDisplayer(false)
                } else {
                  setShowNavigation(true)
                  onScrollInQuestionDisplayer(true)
                }
              },
            })
        }>
        {data.QAndA.map(renderListItem)}
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

        {/* {showNavigation && <Text onPress={onBackPress} style={styles.backButton}>Back</Text>} */}

      </Animated.View>
      {!showNavigation &&
        <View style={styles.categoryContain}>
          <TouchableOpacity
            onPress={onBackPress}
            style={{ ...styles.thridWidth, textAlign: "left" }}
          >
            <Text style={{ ...styles.category, textAlign: "left" }}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.category}>{data?.name}</Text>
          <TouchableOpacity onPress={onBackPress} style={styles.thridWidth}>
            <Text style={{ ...styles.category, textAlign: "right" }}>
              {data?.qAndA?.length} Questions
        </Text>
          </TouchableOpacity>
        </View>}
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
    marginTop: 15,
    paddingLeft: 10

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