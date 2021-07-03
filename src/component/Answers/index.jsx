import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Answers = ({ answer, index }) => {

    return (
        <>
            <View >
                <Text  style={styles.answerTitle}>{`Answer ${index + 1}`}</Text>
                <Text style={styles.answerText}>{answer}</Text>
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
    answerTitle:{
        fontWeight : 'bold',
    },
    answerText: {
        color: "#495663",
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.8,
        textAlign: "justify",
    },
});
