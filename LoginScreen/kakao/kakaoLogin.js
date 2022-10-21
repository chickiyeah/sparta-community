import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,View, Alert, BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'

import '../../global.js'

import Networking from 'react-native/Libraries/Network/RCTNetworking'





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

  let user = ""
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
        //console.log(data)
        //alert(data)
        const userexp = "userinfo="
        const exp = "user_id=";
        let userinfo = ""
        //code=
        let condition = -1
      if(data != undefined){
        condition = data.indexOf(exp);
        userinfo = data.indexOf(userexp)
      }else{
        condition = -1
      }

        //console.log(Networking.getCookies("spartacodingclub.kr"))
        if (condition != -1) {
            //this.webView.ref.stopLoading(true)
            //console.log(data)
            
            let userdata = data.substring(userinfo+userexp.length).split(";")[0].split("&");
            let id = userdata[0].split("=")[1]
            let email = userdata[2].split("=")[1].replace("%40","@")
            let phone = userdata[3].split("=")[1]
            var request_code = data.substring(condition + exp.length);
            request_code = request_code.split(";")[0]
            user = `{"id":"${request_code}","email":"${email}","phone":"${phone}"}`
            user = JSON.parse(user)
            
            console.log("access code :: " + user);

            // 토큰값 받기

            //requestToken(request_code);
            requestSparta(request_code);

        }
        /*const exp = "code=";

        var condition = data.indexOf(exp);

        if (condition != -1) {
            this.webView.ref.stopLoading(true)
            console.log(data)
            

            var request_code = data.substring(condition + exp.length);

            console.log("access code :: " + request_code);

            // 토큰값 받기

            //requestToken(request_code);
            requestSparta(request_code, phone);

        }*/

    };

//https://online.spartacodingclub.kr/api/v1/oauth/kakao/login?code=
const getCookiesJS = "ReactNativeWebView.postMessage(document.cookie)";
function cache(instance, options) {
    instance.interceptors.request.use(function(config) {
      if (!config.method === 'get') {
        return config;
      }
      return cache.get(generateOptions(config, options))
        .then(createCachedError, function() { return config; });
    });
    instance.interceptors.response.use(null, function(error) {
      if (error.cachedResult) {
        return Promise.resolve(error.cachedResult);
      }
      return Promise.reject(error);
    });
  }

function cachingAdapter(resolve, reject, config) {
  cache.get(generateOptions(config, options)).then(function(result) {
    resolve(createResponse(result));
  }, function() {
    axios.defaults.adapter(resolve, reject, config);
  });
}
const requestSparta = async (token, phone) => {

    var returnValue = "none";

    var request_token_url = "https://api.scc.spartacodingclub.kr/community-user/";

    const axios = require('axios');
    const wrapper = require('axios-cookiejar-support').wrapper;
    const CookieJar = require('tough-cookie').CookieJar;

    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));

    const url = request_token_url;

    const params = new URLSearchParams();
    axios({

        method: "get",

        url: request_token_url+token,

        withCredentials:true,
        maxRedirects: 5,
        credentials: "SAMEORIGIN",

    }).then(function (response) {
        returnValue = response;
        console.log('token',response.data.user)
        user.name = response.data.user.name
user.phone = phone
        user.profile = response.data.user.profile
        console.log('final user data', user)
        navigation.navigate('loginsuccess', user)



    }).catch(function (error) {

        console.log('error', error);

    });



};
const navChange = e => {
    console.log("e", e);
    this.setState({ loading: e.loading });
    if (e.url == "https://spartacodingclub.kr/") {
      CookieManager.getAll(true).then(res => {
        console.log("CookieManager.getAll =>", res);
        if (!!res) {
          console.log({res})
          /*CookieManager.clearAll(true).then(res => {
            console.log("LoginScreen CookieManager.clearAll =>", res);
          });*/
        }
      });
    }
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

                Authorization: 'Bearer '+token,
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'

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

            //navigation.navigate('loginsuccess', {service,nickname,profile_image,birthday,email,id,gender,phone_number})

 

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
                onNavigationStateChange={(navState) => {this.webView.canGoBack = navState.canGoBack;this.navChange}}

                style={{ marginTop: 30 }}

                source={{ uri: 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e97351b42b29c3d0518f85d0368a8985&redirect_uri=https://online.spartacodingclub.kr/api/v1/oauth/kakao/login' }}
                //e97351b42b29c3d0518f85d0368a8985
                //535068688f1a8bca1c21a9445ede0a89

                //https://online.spartacodingclub.kr/login?next=https://spartacodingclub.kr/community
                //https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e97351b42b29c3d0518f85d0368a8985&redirect_uri=https://online.spartacodingclub.kr/api/v1/oauth/kakao/login
                injectedJavaScript={getCookiesJS}
                
                javaScriptEnabled={true}

                onShouldStartLoadWithRequest={(event) => {LogInProgress(event.url);return true}}
                onMessage={(event) => {LogInProgress(event.nativeEvent.data)}}
                sharedCookiesEnabled={true}
                thirdPartyCookiesEnabled = {true}

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
