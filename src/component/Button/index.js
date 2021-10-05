import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Button = ( { text, onPress,style }) => {
    return (
        <TouchableOpacity style={[styles.buttonStyle,style.buttonAllignment]}
            onPress={() => onPress()}
        >
            <Text style={[styles.textStyle,style.textAllignment]}>{text}</Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {};

export default Button;

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
    },

    buttonStyle: {
        padding: 10,
        backgroundColor: '#f6d867', 
        borderRadius: 5,
    }
});
