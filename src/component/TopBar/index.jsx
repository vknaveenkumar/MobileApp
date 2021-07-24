import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";

const TopBar = ({ onHomePress }) => {
  return (
    <View style={styles.appBar}>
        <TouchableOpacity onPress={onHomePress}>
          <Text style={styles.title}>JavaScript Master</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onHomePress}>
          <Text style={styles.title}>Exit</Text>
        </TouchableOpacity> */}
    </View>
  );
};

TopBar.propTypes = {};

export default TopBar;

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    elevation: 1
  },
  title: {
    color: "#495663",
    fontSize: 20,
    fontWeight: "bold",
  },
  backText:{
    color: "#495663",
    fontSize: 20,
    fontWeight: "bold",
    //alignSelf:''
    //paddingLeft:5
    //paddingLeft:10
  }
});
