import AsyncStorage from "@react-native-community/async-storage";

import AppStrings from '../utils/AppStrings';

export async function simplePostCall(url, requestBody) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function postWithAuthCall(url, requestBody) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + await AsyncStorage.getItem(AppStrings.token),
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function simpleGetCall(url) {

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + await AsyncStorage.getItem(AppStrings.token),
            // 'Authorization': 'Token 057a846eb0c399340958c9629244cb73b569b95d'
        }
    }).then((response) => response.json());

}

export async function getMyProfile(url) {

    url = url + await AsyncStorage.getItem(AppStrings.userId) + '/';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + await AsyncStorage.getItem(AppStrings.token),
            // 'Authorization': 'Token 3448a347c207b11e9d34cfff2940409fca3c6320'
        }
    }).then((response) => response.json());

}

export async function updateProfile(url, requestBody) {

    url = url + await AsyncStorage.getItem(AppStrings.userId) + '/';

    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + await AsyncStorage.getItem(AppStrings.token),
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function multipartPostCall(url, requestBody) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function multipartWithTokenPostCall(url, requestBody) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'bearer '+ await AsyncStorage.getItem(AppStrings.token)
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function multipartWithTokenPutCall(url, requestBody) {

    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + await AsyncStorage.getItem(AppStrings.token)
        },
        body: requestBody,
    }).then((response) => response.json());

}

export async function checkImageURL(url) {
    return await fetch(url)
        .then(res => {
            if (res.status == 404)
                return false;

            return true;
        });
}