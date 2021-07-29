import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Answers = ({code, answer, index }) => {

    return (
        <>
            <View style={{marginTop:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.answerTitle}>{`Answer:${index + 1}`}</Text>
                <Text style={styles.answerText}> {'\t'}{'\t'}{answer}</Text>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeContainerText}>{`
 ${code}
                    `}</Text>
                </View>
            </View>
        </>
    );
};

Answers.propTypes = {};

export default Answers;

const styles = StyleSheet.create({
    answer: {
        padding: 10,
        borderColor: "#495663",
        borderTopWidth: 1,
    },
    answerTitle: {
        fontWeight: 'bold',
        margin:5,
        alignSelf:'flex-start'
    },
    answerText: {
        color: "#495663",
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.8,
        textAlign: "left",
        fontFamily:'sans-serif-medium',
        
    },
    codeContainer: {
        //height: 50,
        width: '100%',
        backgroundColor:'#171717',
        marginTop: 10,
    },
    codeContainerText:{
        fontSize:13,
        paddingLeft:10,
        color:'white',
        lineHeight:15
    }
});
