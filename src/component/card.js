import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Card({category,onClick}) {
    return (
        <View style={styles.card} onPress={()=>{alert('cliekced')}}>
            <Text style={styles.cardTitle}>{category}</Text>
            <Image
                style={{height:50,width:50}}
                resizeMode="cover"
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 150,
        margin: 20,
        textAlign: 'center',
        backgroundColor: '#00BCD4'
    },
    cardTitle: {
        textAlign: 'center',
        margin: 10
    },
    RectangleShapeView: {
        marginTop: 20,
        width: 120 * 2,
        height: 120,
        backgroundColor: '#FFC107'
    }
});