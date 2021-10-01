import AsyncStorage from "@react-native-async-storage/async-storage";


 

export const getData = async (key) => {
    try {
        //await clearCache()
        let callApiForJson = await checkVersionFromLocal();
        if (callApiForJson) {
            let res = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/.json");
            const data = await res.json();
            await storeData(key, data)
            return { data: data.languages[0].data, showAd: data.showAd, frequencyOfAds: data.frequencyOfAds }
        } else {
            const data = await retrieveData(key)
            return { data: data.languages[0].data, showAd: data.showAd, frequencyOfAds: data.frequencyOfAds }
        }
    } catch (error) {
        return []
    }
}


/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @returns Check version
 */


const checkVersionFromLocal = async () => {
    try {
        //get Server version on every load
        const getServerVersionNumber = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/appVersion.json");
        const serverVersionNumber = await getServerVersionNumber.json();

        //comapting with local
        let checkVersionExists = await retrieveData('@appVersion')

        if (checkVersionExists === null || checkVersionExists === null || checkVersionExists === undefined) {
            await storeData('@appVersion', serverVersionNumber)
            return true
        } else {
            if (checkVersionExists === serverVersionNumber) {
                return false
            }
            return true
        }
    } catch (error) {
        console.log(error)
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


export const clearCache = async () => {
    AsyncStorage.clear()
};