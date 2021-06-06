import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Card from './card';
import { StyleSheet, Text, View } from 'react-native';

export default function Category({onClick}) {
    return (
        <View style={styles.container}>
            <Card onClick={onClick} category={"react"}/>
            <Card onClick={onClick} category={"react"}/>
            <Card onClick={onClick} category={"react"}/>
            <Card onClick={onClick} category={"react"}/>
            <Card onClick={onClick} category={"react"}/>
            <Card onClick={onClick} category={"react"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
});