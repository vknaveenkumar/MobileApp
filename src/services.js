import AsyncStorage from "@react-native-async-storage/async-storage";




export const getData = async (key) => {
    try {
        let data = await retrieveData(key)
        if (data === null || data === undefined) {
            let res = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/.json");
            const records = await res.json(); 
            await storeData(key, records)
        }
        return data
    } catch (error) {
        return []
    }
}



/**
 * 
 *  common method localstorage 
 * 
 */
const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.log(err)
        return null
    }
};

const retrieveData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value !== null) {
            value = JSON.parse(value)
        }
        return value 
    } catch (error) {
        console.log(err)
        return null
    }
};