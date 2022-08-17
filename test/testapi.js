import React, { cloneElement, useState } from 'react';

import { StyleSheet,Text,View,Button, Alert} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'

import sample from './sample.json'


export default function testapi({navigation}){
    const requestToken = async (request_code) => {

        var returnValue = "none";

        var request_token_url = "https://avwx.rest/api/metar/KJFK";

 

        axios({

            method: "get",

            url: request_token_url,

            withCredentials:true,


        }).then(function (response) {
            console.log(response)


 

        }).catch(function (error) {

            console.log('error', error);

        });

    };

    function istype(element) {
        if(element.name === "type") {
            return true;
        }
    }

    return(
        <Button title="글쓰기" onPress={() => {console.log(sample.sample.clouds.map(row=>row.altitude))}}/>
    );
}