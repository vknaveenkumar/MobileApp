import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";

const TopBar = ({ onHomePress }) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={onHomePress}>
        <Text style={styles.title}>JavaScript Master</Text>
      </TouchableOpacity>
    </View>
  );
};

TopBar.propTypes = {};

export default TopBar;

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#495663",
    fontSize: 20,
    fontWeight: "bold",
  },
});
