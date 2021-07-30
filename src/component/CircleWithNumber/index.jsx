import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Circle = ({children,style}) => {
    return (
        <TouchableOpacity
            style={[styles.circle,...style]}
        > 
            {children}  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circle:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        backgroundColor: '#DCDCDC',
        borderRadius: 25,
        borderColor: '#efd81d'
    },
    index: {
        color: "#efd81d",
        fontSize: 15,
        opacity: 0.4,
        color: "#495663",
    },
});


export default Circle