import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,View, Alert, BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'

import '../../global.js'


const toggleSetting2 = () => {
    setting3 ? setSetting2(true) : setSetting2value(false);
  };
// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({useProxy,});

WebBrowser.maybeCompleteAuthSession();
 
export default function NaverLogin({ navigation }) {
    webView = {
        canGoBack: false,
        ref: null,
    }

    useEffect(() => {
        const backAction = () => {

            if(this.webView.canGoBack && this.webView.ref) {
                this.webView.ref.goBack();
                return true;
            }else{
                Alert.alert('잠시만요!', '웹페이지에 돌아갈곳이 없는데 메인페이지로 갈까요?', [
                    {
                      text: '아니요',
                      onPress: () => null,
                      style: 'cancel',
                    },
                    { text: '네', onPress: () => navigation.reset({index: 0, routes:[{name:'MainPage'}]}) },
                ]);
            
                return true;
              }};
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove([navState.canGoBack])
    },[])
    function LogInProgress(data) {

        // access code는 url에 붙어 장황하게 날아온다.

        // substringd으로 url에서 code=뒤를 substring하면 된다.

        const exp = "code=";

        var condition = data.indexOf(exp);

        if (condition != -1) {

            var request_code = data.substring(condition + exp.length);

            var slash = request_code.indexOf("&")
            var state = request_code.substring(slash+1,exp.length)
            var sslash = state.indexOf("&")
            var state = request_code.substring(0,sslash)
            var request_code = request_code.substring(0,slash)

            console.log("access code :: " + request_code);
            console.log("state : "+ state)

            // 토큰값 받기

            requestToken(request_code, state);

        }

    };

 

    const requestToken = async (request_code, state) => {

        var returnValue = "none";

        var request_token_url = "https://nid.naver.com/oauth2.0/token";

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            params:{

                grant_type: 'authorization_code',

                client_id: '9TPEaveH0M8aPRdruXed',

                client_secret: 'm12KJXxNkW',

                code: request_code,
                
                state: state,

            },

        }).then(function (response) {
            returnValue = response.data.access_token;
            console.log(returnValue)
            requestplayer(returnValue)

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };

    const requestplayer = async (returnValue) => {
        var token = returnValue;

        var request_player_url = "https://openapi.naver.com/v1/nid/me";

        axios({

            method: "GET",

            url: request_player_url,

            headers: {

                Authorization: 'Bearer '+token

            },

        }).then(function (response) {

            returnValue = response.data;
            let name = response.data.response.name
            let nickname = response.data.response.nickname
            let id = response.data.response.id
            let service = "naver"
            console.log(returnValue)
            let returnValue = returnValue
            let profile_image = response.data.response.profile_image
            let birthday = response.data.response.birthday
            let birthyear = response.data.response.birthyear
            let mobile = response.data.response.mobile
            let mobile_e164 = response.data.response.mobile_e164
            let email = response.data.response.email
            let gender = response.data.response.gender

            console.log(name)
            const userSettings = {
                nickname,
                profile_image,
                service,
                birthday,
                email,
                toggleSetting2,
              };

                navigation.navigate('loginsuccess', {service,nickname,profile_image,birthday,email,id,gender,mobile,mobile_e164,birthyear,name})

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };
 

    return (

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'NaverLogin'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

            <WebView

                originWhitelist={['*']}

                scalesPageToFit={false}
                
                ref={(webView) => { this.webView.ref = webView; }}
                onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}

                style={{ marginTop: 30 }}

                source={{ uri: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=9TPEaveH0M8aPRdruXed&setState(state)&redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw' }}

                injectedJavaScript={runFirst}

                javaScriptEnabled={true}

                onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}

            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달

            />

        </View>

    );
};

const styles = StyleSheet.create({
    refresh: {
        backgroundColor:"pink",
        width:350,
        height:40,
        borderRadius:10,
        alignSelf:"flex-end",
        marginRight:20,
        marginTop:10
      },
      refreshtext: {
        color:"#fff",
        textAlign:"center",
        fontSize:30
      }
})