import React, {useRef, useEffect, useState } from "react";
import { SafeAreaView,StyleSheet, Image, Text, TouchableOpacity, View, TextInput } from "react-native";

let throttle = false

const Search = ({search}) => {
    const inputEl = useRef(null);
    const [value, setValue] = useState('')

    useEffect(()=>{
        search(value)
    },[value])

    return (
            // <SafeAreaView style={{ flex: 1 }}>
                <TextInput
                    placeholder="Search Your Questions"
                    editable
                    ref={inputEl}
                    value={value}
                    onChangeText={text => setValue(text)}
                    style={{
                        backgroundColor: 'white',
                        borderBottomColor: "white",
                        width: 250,
                        height: 25,
                        borderRadius: 100,
                        paddingLeft: 20,
                        //marginTop:5
                    }}
                    maxLength={40}
                />
            // </SafeAreaView>
      
    );
};

Search.propTypes = {};

export default Search;

const styles = StyleSheet.create({

});
