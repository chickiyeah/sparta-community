import React, {useState,useEffect}from 'react';

import { StyleSheet,Text,View,Button, Alert, Image, ScrollView} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig";

import WriteCardProfile from '../components/WriteCardProfile';
import '../global.js'
import { GoogleLogin } from 'react-google-login';

export default function SelectLogin({navigation}) {

    const clientId =
    "53440918166-mghgh63e9rh5pj4k4jfjj3d8creg1alv.apps.googleusercontent.com";

  async function onSuccess(res) {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    }; 
    // 로그인 성공 후 실행하기 원하는 코드 작성.
  
  }

  const onFailure = (res) => {
    alert("구글 로그인에 실패하였습니다");
    console.log("err", res);
  };

    return(
        <View style={styles.container}>
        <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'ProfileScreen'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>

        <View style={styles.titlecontainer}>
            <Text style={styles.title}> 로그인할 플렛폼을 선택해주세요  </Text>
        </View>

        <TouchableOpacity onPress={() => {navigation.navigate("kakaoLogin")}}><Image source={require('../assets/kakao_login_medium_wide.png')} style={styles.kakaologin}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("NaverLogin")}}><Image source={require('../assets/btnG_완성형.png')} style={styles.Naverlogin}></Image></TouchableOpacity>
        <TouchableOpacity onPress={() => {global.search = "false",navigation.navigate("sparta")}}><Image source={{uri:'https://spartacodingclub.kr/v5/images/icon-beta.png'}} style={styles.Googlelogin}></Image></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        //backgroundColor:"blue"
    },
    titlecontainer: {
        width:360,
        height:40,
        backgroundColor:"orange",
        borderRadius:20,
        marginTop:20,
        alignSelf:"center",
        alignContent:"center",
        flexDirection:"row"
        
    },
    title: {
       fontSize:20,
       marginTop:5,
       textAlign:'center',
       marginLeft:38
    },
    profileedit: {
        width:100,
        height:30,
        marginLeft:20,
        marginTop:5,
        backgroundColor:"cyan",
        alignSelf:"flex-end",
        alignContent:"center",
        borderRadius:20
    },
    profileedittext: {
        textAlign:"center",
        fontSize:20,
        marginTop:0
    },
    //본문
    desccontainer: {
        width:350,
        height:500,
        marginTop:20,
        marginLeft:17.5,
        marginBottom:5,
        //backgroundColor:"green",
        flexDirection:"column"
    },
    topcontainer1:{
        height:100,
        //backgroundColor:"magenta",
        flexDirection:"row",
        lineHeight:3,
        borderWidth:2,
        borderRadius:10,
        borderColor:"magenta"
    },
    //프로필이미지
    profileimage:{
        width:87,
        height:87,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        //backgroundColor:"orange",
        borderRadius:15

    },
    //이름
    namecontainer:{
        width:240,
        height:87,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        //backgroundColor:"cyan",
        borderRadius:15
    },
    nameText:{
        marginLeft:5,
        fontSize:15
    },
    refresh: {
        backgroundColor:"pink",
        width:350,
        height:40,
        borderRadius:10,
        marginLeft:20,
        alignSelf:"center",
        marginRight:20,
        marginTop:5
      },
      refreshtext: {
        color:"#fff",
        textAlign:"center",
        fontSize:30
      },

    kakaologin: {
        alignSelf:"center",
        marginTop:30
    },
    Naverlogin: {
        alignSelf:"center",
        width:300,
        height:50,
        borderRadius:10,
        marginTop:20
    },
    Googlelogin: {
        alignSelf:"center",
        width:300,
        height:80,
        borderRadius:10,
        marginTop:30
    },
    termcontainer: {
        width:360,
        height:60,
        backgroundColor:"red",
        borderRadius:20,
        marginTop:20,
        alignSelf:"center",
        alignContent:"center",
        flexDirection:"row"
        
    },
    termtitle: {
        fontSize:20,
        marginTop:5,
        textAlign:'center',
        marginLeft:22
     }


})