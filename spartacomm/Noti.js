import React,{useState,useEffect} from 'react';
//import * as React from 'react';
//ca-app-pub-8113412540427082/4459695930  ios 가로배너
//ca-app-pub-8113412540427082/6526907333 android 광고 가로배너

//ca-app-pub-8113412540427082/4958103971 ios 광고 전면
//ca-app-pub-8113412540427082/7553048540 android 광고 전면
import main from '../assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, BackHandler, Alert, Linking} from 'react-native';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import {firebase_db} from "../firebaseConfig";
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Device from 'expo-device';
import * as RootNavigation from '../RootNavigation.js';

import * as Notifications from 'expo-notifications';
import '../global.js'

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

const Drawer = createDrawerNavigator();
export default function Noti({navigation,route}) {
  console.disableYellowBox = true;
  //return 구문 밖에서는 슬래시 두개 방식으로 주석

  //기존 꿀팁을 저장하고 있을 상태
  const [state,setState] = useState([])
  //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
  const [cateState,setCateState] = useState([])

  //날씨 데이터 상태관리 상태 생성!
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })

  //컴포넌트에 상태를 여러개 만들어도 됨
  //관리할 상태이름과 함수는 자유자재로 정의할 수 있음
  //초기 상태값으로 리스트, 참거짓형, 딕셔너리, 숫자, 문자 등등 다양하게 들어갈 수 있음.
  const [ready,setReady] = useState(true)
  const [istermagree,settermagree] = useState(false)
  const [pushindex,setPushIndex] = useState()
  useEffect(()=>{
	   
    //뒤의 1000 숫자는 1초를 뜻함
    setTimeout(()=>{    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    
      firebase_db.ref('/pushindex').once('value').then((index) => {
        let num = index.val();
        setPushIndex(num)
        global.pushindex = num
          console.log(pushindex)

      })
      
        //헤더의 타이틀 변경
        let id = global.id
        firebase_db.ref(`/term/${id}/agreed`).once('value').then((agreed) => {
          settermagree(agreed);
        })
        firebase_db.ref('/tip').once('value').then((snapshot) => {
          console.log("파이어베이스에서 데이터 가져왔습니다!!")
          let tip = snapshot.val();
          setState(tip)
          setCateState(tip)
          //getLocation()
          //makeAlert('위치 정보를 수집했습니다.', '날씨 표시를 위해 위치정보를 수집했습니다.', '')
          setReady(false)
          });
        // setTimeout(()=>{
        //     let tip = data.tip;
        //     setState(tip)
        //     setCateState(tip)
        //     getLocation()
        //     setReady(false)
        // },500)
    },1000)

    /*const makeAlert = (title, body, uri) => {
      //const prefix = Linking.createURL('/MainPage'); 
      Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: {
            uri: uri
          }
        },
        trigger: {
          seconds: 1, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
        },
      });
    }*/

    const backAction = () => {
      
        RootNavigation.navigate("MainPage")
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    
  },[])



  /*const getLocation = async () => {
    //수많은 로직중에 에러가 발생하면
    //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
    try {
      //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      await Location.requestForegroundPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(temp)
      console.log(condition)

      //오랜만에 복습해보는 객체 리터럴 방식으로 딕셔너리 구성하기!!
      //잘 기억이 안난다면 1주차 강의 6-5를 다시 복습해보세요!
      setWeather({
        temp,condition
      })
      


    } catch (error) {
      //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껏다 켜볼까요?");
    }
  }*/

    const category = (cate) => {
        if(cate == "전체보기"){
            //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
                return d.category == cate
            }))
        }
    }


  //실제 데이터를 넣을 예정이므로 주석!
	// let todayWeather = 10 + 17;
  // let todayCondition = "흐림"

	//처음 ready 상태값은 true 이므로 ? 물음표 바로 뒤에 값이 반환(그려짐)됨
  //useEffect로 인해 데이터가 준비되고, ready 값이 변경되면 : 콜론 뒤의 값이 반환(그려짐)
  
  function goSlack(){
    Linking.openURL('https://join.slack.com/t/spartacodingclub/shared_invite/zt-1d11rq0k7-ZiCee_xmbE72TnPMNTrOsg')
  }

  function goHomePage(){
    Linking.openURL('https://spartacodingclub.kr/community/fastqna/all')
  }

  function goGather(){
    Linking.openURL('https://app.gather.town/app/uqfFhchUsf1fCPsi/study')
  }
  
  function goInfo(){

  }
    return ready ? <Loading/> :  (
      /*
        return 구문 안에서는 {슬래시 + * 방식으로 주석
      */
  
  
      <ScrollView style={styles.container}>
          
          <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'MainPage'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
          <StatusBar style="black" />
        <View style={styles.titlecontainer}>
            <Text style={styles.title}>공지 사항</Text>
            </View>
          <View style={styles.cardContainer}>
              {/* 하나의 카드 영역을 나타내는 View */}
             {
               cateState.map((content,i)=>{
                  return (<Card content={content} key={i} navigation={navigation}/>)
              })
              }
          </View>
      </ScrollView>
    );
 
}

const styles = StyleSheet.create({
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
    marginTop:5,
    //왼쪽 공간으로 부터 이격
    marginLeft:20,
    textAlign:"center"
  },
  titlecontainer: {
    width:"85%",
    backgroundColor:"magenta",
    alignSelf:"center",
    marginTop:10,
    paddingBottom:5,
    borderRadius:10
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
    fiex:1
  },
  noti: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"red",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButtonAll: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButton04: {
    width:"92%",
    height:50,
    padding:15,
    backgroundColor:"blue",
    borderRadius:15,
    margin:7
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
    width:"90%",
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


});