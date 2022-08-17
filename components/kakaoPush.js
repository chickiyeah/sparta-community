import React, {createContext, useContext, useReducer} from 'react';

import { StyleSheet,Text,View,Button, Alert, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import '../global.js'

import axios from 'axios';

export const requestlist = async () => {

    var request_player_url = "https://kapi.kakao.com/v1/user/ids";

    axios({

        method: "GET",

        url: request_player_url,

        headers: {

            Authorization: 'KakaoAK a3e213ed2ed361872a56148a81ada82b'

        },

    }).then(function (response) {

        console.log(response.data.elements)
        requestpush(response.data.elements)



    }).catch(function (error) {

        console.log('error', error);

    });

    return(
        <View><Text>"..."</Text></View>
    )

};

const requestpush = async (list) => {

    var request_player_url = "https://kapi.kakao.com/v2/push/send";

    axios({

        method: "GET",

        url: request_player_url,

        headers: {

            Authorization: 'KakaoAK a3e213ed2ed361872a56148a81ada82b'

        },

        params: {

            uuids: list,
            push_message:{
                for_apns:{
                    badge:3,
                    push_alert:true,
                    message:"홍길동님 외 2명이 댓글을 달았습니다.",    
                }
            }

        },

    }).then(function (response) {

        console.log(response)



    }).catch(function (error) {

        console.log('error', error);

    });

    return(
        <View><Text>"..."</Text></View>
    )

};



