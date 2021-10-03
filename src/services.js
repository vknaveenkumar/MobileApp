import AsyncStorage from "@react-native-async-storage/async-storage";




export const checkForFirstTimeUser = async () => {
    try {
         //await clearCache()
        let checkVersionExists = await retrieveData('@appVersion')
        if (checkVersionExists === null || checkVersionExists === undefined) {
            return {  firstTimeUserStatus: true, message: "You are time time user . We are Downloading your questions!!! " }
        }else{
            return { firstTimeUserStatus: false, message: "" }
        } 
    } catch (err) {
        return { firstTimeUserStatus: false, message: "Seems to be your network connection issue . check check your network connection" }
    }
}

export const checkForUpdates = async () => {
    try {
       
        const getServerVersionNumber = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/appVersion.json");
        const serverVersionNumber = await getServerVersionNumber.json();
        let checkVersionExists = await retrieveData('@appVersion')
        if (checkVersionExists !== serverVersionNumber) {
            return { updateStatus: true, message: "We have updated your questions . Please Click Downlaod to update" }
        }else{
            return { updateStatus: false, message: "" }
        } 

    } catch (err) {
         return {  updateStatus: false, message: "Seems to be your network connection issue . check check your network connection" }
    }
}
 

export const getData = async (key,callApi) => {
    try {
       // await clearCache()
       // let callApiForJson = await checkVersionFromLocal();
        if (callApi) {
            let res = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/.json");
            const data = await res.json();
            await storeData(key, data)
            await storeData('@appVersion', data.appVersion)
            return { data: data.languages[0].data, showAd: data.showAd, frequencyOfAds: data.frequencyOfAds }
        } else {
            const data = await retrieveData(key)
            return { data: data.languages[0].data, showAd: data.showAd, frequencyOfAds: data.frequencyOfAds }
        }
    } catch (error) {
        //alert('network issue while calling api mehod')
    }
}


/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @returns Check version
 */


// const checkVersionFromLocal = async () => {
//     try {

//         const getServerVersionNumber = await fetch("https://mobileapp-7db4e-default-rtdb.firebaseio.com/appVersion.json");
//         const serverVersionNumber = await getServerVersionNumber.json();

//         //comapting with local
//         let checkVersionExists = await retrieveData('@appVersion')

//         if (checkVersionExists === null || checkVersionExists === undefined) {
//             await storeData('@appVersion', serverVersionNumber)
//             return true
//         } else {
//             if (checkVersionExists === serverVersionNumber) {
//                 return false
//             }
//             return true
//         }
//     } catch (error) {
//         alert(error)
//     }

// }



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