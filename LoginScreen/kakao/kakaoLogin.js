import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,View, Alert, BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'

import '../../global.js'




export const kakaoGlobal = () => {
    const [nickname, setnickname] = useState('nickname')
    const [email, setemail] = useState('email')
    const [id, setid] = useState('id')
    const [profile_image ,setprofile_image] = useState('profile_image')
    const [birthday, setbirthday] = useState('birthday')
}

const toggleSetting2 = () => {
    setting3 ? setSetting2(true) : setSetting2value(false);
  };
// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({useProxy,});

WebBrowser.maybeCompleteAuthSession();
 
export default function kakaoLogin({ navigation }) {
    this.webView= {
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
            this.webView.ref.stopLoading(true)
            console.log(data)
            

            var request_code = data.substring(condition + exp.length);

            console.log("access code :: " + request_code);

            // 토큰값 받기

            requestToken(request_code);

        }

    };

//https://online.spartacodingclub.kr/api/v1/oauth/kakao/login?code=


const requestSparta = async (token) => {

    var returnValue = "none";

    var request_token_url = "https://online.spartacodingclub.kr/api/v1/oauth/kakao/token";



    axios({

        method: "get",

        url: request_token_url,

        withCredentials:true,

        headers: {

            'Content-Type': 'application/x-www-form-urlencoded',
            code: token,

        },

    }).then(function (response) {
        returnValue = response;
        console.log('token',returnValue)
        //console.log(response.request.header)
        //requestplayer(returnValue)



    }).catch(function (error) {

        console.log('error', error);

    });

};

 

    const requestToken = async (request_code) => {

        var returnValue = "none";

        var request_token_url = "https://kauth.kakao.com/oauth/token";

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            params: {

                grant_type: 'authorization_code',

                client_id: '535068688f1a8bca1c21a9445ede0a89',

                redirect_uri: 'https://online.spartacodingclub.kr/api/v1/oauth/kakao/login',

                code: request_code,

            },

        }).then(function (response) {
            returnValue = response.data.access_token;
            console.log('token',returnValue)
            requestplayer(returnValue)

 

        }).catch(function (error) {

            console.log('error', error.response);

        });

    };

    const requestplayer = async (returnValue) => {
        var token = returnValue;

        var request_player_url = "https://kapi.kakao.com/v2/user/me";

        axios({

            method: "GET",

            url: request_player_url,

            headers: {

                Authorization: 'Bearer '+token

            },

        }).then(function (response) {

            returnValue = response.data;
            console.log(returnValue)
            let nickname = response.data.kakao_account.profile.nickname;
            let gender = response.data.kakao_account.gender;
            let id = response.data.id
            let service = "kakao"
            let returnValue = returnValue
            let profile_image = response.data.kakao_account.profile.profile_image_url
            let birthday = response.data.kakao_account.birthday
            let email = response.data.kakao_account.email
            let phone_number = response.data.kakao_account.phone_number
            

            const userSettings = {
                nickname,
                profile_image,
                service,
                birthday,
                email,
              };

            //navigation.navigate('loginsuccess', {service,nickname,profile_image,birthday,email,id,gender})

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };
 

    return (

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'kakaoLogin'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

            <WebView

                originWhitelist={['*']}

                scalesPageToFit={false}
                
                ref={(webView) => { this.webView.ref = webView; }}
                onNavigationStateChange={(navState) => {this.webView.canGoBack = navState.canGoBack; }}

                style={{ marginTop: 30 }}

                source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=535068688f1a8bca1c21a9445ede0a89&redirect_uri=https://online.spartacodingclub.kr/api/v1/oauth/kakao/login' }}

                injectedJavaScript={runFirst}
                
                javaScriptEnabled={true}

                onShouldStartLoadWithRequest={(event) => {if(event.url.includes("code")){LogInProgress(event.url);return true;}else{return true;}}}

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