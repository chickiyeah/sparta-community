import React, { cloneElement, useEffect } from 'react';

import { StyleSheet,Text,View,BackHandler} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as RNSScreen from '@react-navigation/native'
import '../../global.js'


 

// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({useProxy,});

WebBrowser.maybeCompleteAuthSession();


 
export default function kakaoLogout({ navigation }) {
    useEffect(() => {
        const backAction = () => {
      
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()
    })
   /* let re = WebBrowser.openBrowserAsync('https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2e726e0391587bdf6db6c878ca69e208&redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw');
    const discovery = AuthSession.useAutoDiscovery('https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2e726e0391587bdf6db6c878ca69e208&redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw');
const authUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=2e726e0391587bdf6db6c878ca69e208&redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw'
       const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
            
            clientSecret: '2CvUYsuq8y9NksDqbkFckSm6QrlwIzqB',
            scopes: ['openid', 'profile', 'email', 'offline_access']
        
    },
    discovery
);

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync({ useProxy })} />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
    let url = redirect_uri
    console.log(url)
 */

    function LogInProgress(data) {

        // access code는 url에 붙어 장황하게 날아온다.

        // substringd으로 url에서 code=뒤를 substring하면 된다.

        if(data == "https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw"){
            global.id = []
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
        }

    };

 

    const requestToken = async (request_code) => {

        var returnValue = "none";

        var request_token_url = "https://kauth.kakao.com/oauth/";

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            params: {

                grant_type: 'authorization_code',

                client_id: '2e726e0391587bdf6db6c878ca69e208',

                redirect_uri: 'https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw',

                client_screct: '2CvUYsuq8y9NksDqbkFckSm6QrlwIzqB',

                code: request_code,

            },

        }).then(function (response) {
            returnValue = response.data.access_token;
            console.log('token',returnValue)
            

 

        }).catch(function (error) {

            console.log('error', error);

        });

    };


 

    return (

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'kakaoLogout'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

            <WebView

                originWhitelist={['*']}

                scalesPageToFit={false}

                style={{ marginTop: 30 }}

                source={{ uri: 'https://kauth.kakao.com/oauth/logout?response_type=code&client_id=2e726e0391587bdf6db6c878ca69e208&logout_redirect_uri=https://auth.expo.io/@ruddls030/sparta-myhoneytip-nkw' }}

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