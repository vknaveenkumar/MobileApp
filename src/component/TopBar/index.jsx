import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import Search from '../Search'


const TopBar = ({ onHomePress, enableSearch, search }) => {
  return (
    <>
      <View style={styles.appBar}>
        <View style={{marginRight:'auto'}}><Text>&nbsp;&nbsp;</Text></View>
        <TouchableOpacity onPress={onHomePress}>
          {enableSearch ? <Search search={search} /> :
            <Text style={styles.title}>JavaScript Master</Text>
          }
          {/* <Search search={search} /> */}
        </TouchableOpacity>
        <View style={{marginLeft:'auto'}}><Text>&nbsp;&nbsp;</Text></View>
      </View>
    </>
  );
};

TopBar.propTypes = {};

export default TopBar;

const styles = StyleSheet.create({
  appBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1
  },
  title: {
    color: "#495663",
    fontSize: 20,
    fontWeight: "bold",
  },
  backText: {
    color: "#495663",
    fontSize: 20,
    fontWeight: "bold",
    //alignSelf:''
    //paddingLeft:5
    //paddingLeft:10
  },
  categoryContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
    height: '5%'
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
