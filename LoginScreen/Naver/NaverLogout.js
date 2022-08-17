// http://nid.naver.com/nidlogin.logout\

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
 
export default function NaverLogout({ navigation }) {
    webView = {
        canGoBack: false,
        ref: null,
    }

    function LogInProgress(data) {

        // access code는 url에 붙어 장황하게 날아온다.

        // substringd으로 url에서 code=뒤를 substring하면 된다.

        if(data == "https://nid.naver.com/nidlogin.logout"){
            global.id = []
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
        }else{
            console.log(data)
        }

    };


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

    return (

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'NaverLogin'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

            <WebView

                originWhitelist={['*']}

                scalesPageToFit={false}
                
                ref={(webView) => { this.webView.ref = webView; }}
                onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}

                style={{ marginTop: 30 }}

                source={{ uri: 'http://nid.naver.com/nidlogin.logout' }}

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