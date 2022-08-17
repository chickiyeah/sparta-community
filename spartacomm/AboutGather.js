import React,{useState, useEffect, PureComponent} from 'react';
import RN, {BackHandler, ScrollView, Text, StyleSheet, Alert, Image, View, useWindowDimensions, Button, Animated } from 'react-native';
import SpartaCardComment from '../components/SpartaCardComment';
import * as Linking from 'expo-linking';
import AutoHeightImage from "react-native-auto-height-image";
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global.js';
import { SliderBox } from 'react-native-image-slider-box';
import RNJsxParser from 'react-native-jsx-parser'
loaded = false;


export default function AboutGather({route, navigation, beforeid}){
  


    useEffect(() => {

        const backAction = () => {
          clearInterval()
      
                navigation.goBack()
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()

        

        
    })

    let startgather = ['20:00']

    var now = new Date();
    var write = new Date();

    let year = now.getFullYear()
    let month = now.getMonth()
    let day = now.getDate()
    let hours = now.getHours()+9
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    let nowdate = new Date(year, month, day, hours, minutes, seconds)

    let week = [ '일요일', '월요일', '화효일', '수요일', '목요일', '금요일', '토요일' ];
    let gather = ['일요일 오후 02:00 ~ 05:00',
    '월요일 오후 08:00 ~ 11:00','화요일 오후 08:00 ~ 11:00','수요일 오후 08:00 ~ 11:00','목요일 오후 08:00 ~ 11:00','금요일 없음','토요일 오후 02:00 ~ 05:00']
    let list = []
    gather.map((value, i) => {
      mapStringToComponent(value, list, nowdate)
    })
    if(week[nowdate.getUTCDay()].includes("금"))
    {
      write = new Date(nowdate.setUTCHours(14,0,0,0))
      write = new Date(write.setDate(7))
    }else{
      write = new Date(nowdate.setUTCHours(20,0,0,0))
    }
    //new Date()
    nowdate = new Date(year, month, day, hours, minutes, seconds)
    let elti = ``



    if(nowdate.getUTCHours() >= 23 && (week[nowdate.getUTCDay()].includes('월') || week[nowdate.getUTCDay()].includes('화') || week[nowdate.getUTCDay()].includes('수') || week[nowdate.getUTCDay()].includes("목") || week[nowdate.getUTCDay()].includes("금"))){
      if(week[nowdate.getUTCDay()].includes('월') || week[nowdate.getUTCDay()].includes('화') || week[nowdate.getUTCDay()].includes('수') || week[nowdate.getUTCDay()].includes('일')){
        write = new Date(write.setUTCDate(write.getUTCDate()+1))
      }
      if(week[nowdate.getUTCDay()].includes("목요일")){      
        write = new Date(nowdate.setUTCHours(14,0,0,0))
        write = new Date(write.setUTCDate(write.getUTCDate()+2))
      }
      if(week[nowdate.getUTCDay()].includes("금요일")){      
        write = new Date(nowdate.setUTCHours(14,0,0,0))
        write = new Date(write.setUTCDate(write.getUTCDate()+1))
      }
      if(week[nowdate.getUTCDay()].includes("토요일")){
        write = new Date(write.setUTCDate(write.getUTCDate()+1))
        write = new Date(nowdate.setUTCHours(14,0,0,0))
      }
      nowdate = new Date(year, month, day, hours, minutes, seconds)
      console.log(nowdate)
      console.log(write)
      elti = write.getTime() - nowdate.getTime()
      console.log(elti)
    }else{
      if(week[nowdate.getUTCDay()].includes("목요일")){      
        write = new Date(nowdate.setUTCHours(14,0,0,0))
        write = new Date(write.setUTCDate(write.getUTCDate()+2))
        nowdate = new Date(year, month, day, hours, minutes, seconds)
      }
      if(week[nowdate.getUTCDay()].includes("금요일")){      
        write = new Date(nowdate.setUTCHours(14,0,0,0))
        write = new Date(write.setUTCDate(write.getUTCDate()+1))
        nowdate = new Date(year, month, day, hours, minutes, seconds)
      }
      if(nowdate.getUTCHours() >= 17 && (week[nowdate.getUTCDay()].includes('토요일') || week[nowdate.getUTCDay()].includes('일요일'))){
        console.log("here")
        if(week[nowdate.getUTCDay()].includes("토요일")){      
          write = new Date(nowdate.setUTCHours(14,0,0,0))
          write = new Date(write.setUTCDate(write.getUTCDate()+1))
          nowdate = new Date(year, month, day, hours, minutes, seconds)
        }   
        if(week[nowdate.getUTCDay()].includes("일요일")){      
          write = new Date(nowdate.setUTCHours(20,0,0,0))
          write = new Date(write.setUTCDate(write.getUTCDate()+1))
          console.log(write)
          nowdate = new Date(year, month, day, hours, minutes, seconds)
        }   
      }else{
        if(week[nowdate.getUTCDay()].includes("토요일")){      
          write = new Date(nowdate.setUTCHours(14,0,0,0))
          nowdate = new Date(year, month, day, hours, minutes, seconds)
        }   
        if(week[nowdate.getUTCDay()].includes("일요일")){      
          write = new Date(nowdate.setUTCHours(14,0,0,0))
          nowdate = new Date(year, month, day, hours, minutes, seconds)
        }           
      }
      elti = write.getTime() - nowdate.getTime()
    }
    console.log(nowdate.getUTCDay())
    console.log(nowdate.getUTCDate())
    

    let chai = elti

    let a = ``
    let b = ``

    if(chai < 1000 * 60)
      a += Math.floor(chai / 1000) + ' 초전',
      b = (React.createElement(
        RN['Text'],
        {style:{marginLeft:5,textAlign:"center",color:"red",fontSize:30}}, // here may be an object with attributes if your node has any
        a,
      ));
    else if(chai < 1000 * 60 * 60)
      a += Math.floor(chai / (1000 * 60)) + ' 분 '+Math.floor(((chai % (1000 * 60 * 60)) % (1000 * 60)/1000))+' 초전',
      b = (React.createElement(
        RN['Text'],
        {style:{marginLeft:5,textAlign:"center",color:"orange",fontSize:30}}, // here may be an object with attributes if your node has any
        a,
      ));
    else if(chai < 1000 * 60 * 60 * 24)
      a += Math.floor(chai / (1000 * 60 * 60)) + ' 시간 '+Math.floor((chai % (1000 * 60 * 60)) / (1000 * 60))+' 분 '+Math.floor(((chai % (1000 * 60 * 60)) % (1000 * 60)/1000))+' 초전',
      //console.log(Math.floor(((chai % (1000 * 60 * 60)) % (1000 * 60)/1000))),
      b = (React.createElement(
        RN['Text'],
        {style:{marginLeft:5,textAlign:"center",color:"blue",fontSize:30}}, // here may be an object with attributes if your node has any
        a,
      ));
    else if(chai < 1000 * 60 * 60 * 24 * 30)
      a += Math.floor(chai / (1000 * 60 * 60 * 24)) + ' 일 '+Math.floor((chai % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + ' 시간 '+Math.floor((chai % (1000 * 60 * 60)) / (1000 * 60))+' 분 '+Math.floor(((chai % (1000 * 60 * 60)) % (1000 * 60)/1000))+' 초전',
      b = (React.createElement(
        RN['Text'],
        {style:{marginLeft:5,textAlign:"center",color:"blue",fontSize:30}}, // here may be an object with attributes if your node has any
        a,
      ));
    else if(chai < 1000 * 60 * 60 * 24 * 30 * 12)
      a += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + ' 달 '+Math.floor((chai % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)) + ' 일 '+Math.floor(((chai % (1000 * 60 * 60 * 24 * 30)) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + ' 시간 '+Math.floor((chai % (1000 * 60 * 60)) / (1000 * 60))+' 분 '+Math.floor(((chai % (1000 * 60 * 60)) % (1000 * 60)/1000))+' 초전',
      b = (React.createElement(
        RN['Text'],
        {style:{marginLeft:5,textAlign:"center",color:"blue",fontSize:30}}, // here may be an object with attributes if your node has any
        a,
      ));
    if(a.includes("-")){
        b = (React.createElement(
          RN['Text'],
          {style:{color:"black",marginLeft:5,fontSize:30,textAlign:"center"}}, // here may be an object with attributes if your node has any
          "진행중",
        ));
    }

    function goGather(){
      Linking.openURL('https://app.gather.town/app/uqfFhchUsf1fCPsi/study')
    }
    

    function mapStringToComponent(stringToRender, list, nowdate) {
      nowdate = new Date(year, month, day, hours, minutes, seconds)
       // result of this regex ["<Text>hello</Text>", "Text", "hello"]
        if(stringToRender.includes(week[nowdate.getUTCDay()])){
            list.push(React.createElement(
              RN['Text'],
              {style:{color:"green",marginLeft:5,fontSize:20,textAlign:"center"}}, // here may be an object with attributes if your node has any
              stringToRender,
            ));
        }else{
          list.push(React.createElement(
            RN['Text'],
            {style:{marginLeft:5,textAlign:"center"}}, // here may be an object with attributes if your node has any
            stringToRender,
          ));
        }
    
      return null
    }
    
    return (
      
      <ScrollView>
        <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'AboutGather'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
        <Text style={styles.title}>스온스 (게더)에 관하여</Text>
        <View style={styles.descotainer}></View>
          <Text style={styles.desc}>스온스는 스파르타 온라인 스터디의 약자입니다</Text>
          <Text style={styles.desc}>게더라는 가상의 공간에서 진행됩니다</Text>
          <Text style={styles.title}>진행 시간</Text>
          <View style={styles.cardDesc}>{list.map((value) => {return(value)})}</View>
          <Text style={styles.title}>시작까지 남은시간</Text>
          {b}
          <Text style={{textAlign:"center",fontWeight:"500"}}>랙 유발로 인해 자동 새로고침 기능은 없습니다.</Text>
          <TouchableOpacity style={styles.middleButton04} onPress={()=>{goGather()}}><Text style={styles.middleButtonTextAll}>스온스 (게더)로 입장하기 ( 크롬 필수 )</Text></TouchableOpacity>
      </ScrollView>
        
    );
}

const styles = StyleSheet.create({
  now:{
    textAlign:"center",
    fontSize:40
  },
  descotainer: {
    marginTop:5,
    alignContent:'center'
  },
  desc:{
    marginLeft:5,
    textAlign:"center"
  },
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:7,
    //왼쪽 공간으로 부터 이격
    textAlign:'center',
    backgroundColor: 'pink',
    paddingBottom:5,
    paddingTop:3
  },
weather:{
    alignSelf:"flex-end",
    paddingRight:20
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width:'80%',
    //컨텐츠의 높이 값
    height:158,
    //컨텐츠의 모서리 구부리기
    borderRadius:10,
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    resizeMode:"contain",
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  middleContainer:{
    marginTop:50,
    marginLeft:10,
    width:"100%",
    alignSelf:'center'
  },
  noti: {
    width:"97%",
    height:50,
    padding:15,
    backgroundColor:"red",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButtonAll: {
    width:"100%",
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    marginleft:8,
    marginBottom:7

  },
  middleButton01: {
    width:"97%",
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    marginleft:8,
    marginBottom:7
  },
  middleButton02: {
    width:"97%",
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    marginleft:8,
    marginBottom:7
  },
  middleButton03: {
    width:"97%",
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    marginleft:8,
    marginBottom:7
  },
  middleButton04: {
    width:"97%",
    height:50,
    padding:15,
    backgroundColor:"blue",
    borderRadius:15,
    marginLeft:8,
    marginBottom:7,
    marginTop:50
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  middleButtonTextAll: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  loginButton: {
    backgroundColor:"magenta",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-start",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  },
  banner: {
    //배너 스타일!
    alignSelf:"center",
    marginBottom:10
   },
   refresh: {
    backgroundColor:"pink",
    width:"95%",
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginLeft:8,
    marginRight:10,
    marginTop:10
  },
  refreshtext: {
    color:"#fff",
    textAlign:"center",
    fontSize:30
  }


});