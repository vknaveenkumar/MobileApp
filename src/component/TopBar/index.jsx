import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TopBar = ({ onHomePress }) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={onHomePress}>
        <Text style={styles.title}>JavaScript</Text>
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
  }
});
