import React, {useState,useEffect}from 'react';

import { StyleSheet,Text,View,BackHandler, Alert, Image, ScrollView} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig";

import WriteCardProfile from '../components/WriteCardProfile';
import '../global.js'


export default function ProfileScreen({navigation}) {
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    const [Return, setReturn] = useState(false)
    let loaded = false
    useEffect( ()=>{
        
        let user_id = global.id;
        let name = global.name.nickname
        let email = global.email.email
        let profile_image = global.profile_image.profile_image
        if(name != undefined){
            firebase_db.ref('/write/'+user_id).once('value').then((snapshot) => {
                
                console.log("파이어베이스에서 데이터 가져왔습니다!!")
                let tip = snapshot.val();
                let tip_list = Object.values(tip)
                if(tip_list.length > 0){
                    setTip(tip_list)
                    setReady(false)
                    setReturn(true)
                    loaded = true;
                }else{
                    setReady(false)
                    setReturn(true)            
                }
            
            }, error => {
                console.log(error)
            });
        
            setTimeout(()=>{
                if(loaded != true){
                    setReady(false)
                    setReturn(false)
                }
            },3000)
        }else{
            Alert.alert("로딩에 실패했습니다.","먼저 로그인을 해주세요!")
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
            navigation.navigate('MainPage')            
        }

        const backAction = () => {
      
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()
    },[])


    
    let service = global.service.service


    console.log(service)
    if(service == "naver"){
        let user_id = global.id;
        let nickname = global.name.nickname
        let email = global.email.email
        let profile_image = global.profile_image.profile_image
        let mobile = global.mobile.mobile
        if(mobile == undefined){
            mobile = "지정 안됨"
        }
         let birthyear = global.birthyear.birthyear
         if(birthyear == undefined){
            birthyear = "지정 안됨"
        }
        let birthday = global.birthday.birthday
        if(birthday == undefined){
            birthday = "지정 안됨"
        }
        let gender = global.gender.gender
        if(gender == undefined){
            gender = "지정 안됨"
        }else{
            if(gender == "M"){
                gender = "남성"
            }

            if(gender == "F"){
                gender = "여성"
            }
        }

        return ready ? <Loading/> : (
            <View style={styles.container}>
                <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'ProfileScreen'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
                <View style={styles.titlecontainer}>
                
                    <Text style={styles.title}>내 정보</Text>
                    <TouchableOpacity style={styles.profileedit} onPress={() => {
                        Alert.alert("죄송합니다.","아직 개발중인 기능입니다.")
                    }} ><Text style={styles.profileedittext}>수정하기</Text></TouchableOpacity>
                </View>
    
                <ScrollView style={styles.desccontainer}>
                    <View style={styles.topcontainer1}>
                    <Image style={styles.profileimage} source={{uri:profile_image}}></Image>
                        <ScrollView style={styles.namecontainer}>
                            <Text style={styles.nameText}>닉네임 : {nickname}</Text>
                            <Text style={styles.nameText}>이메일 : {email}</Text>
                            <Text style={styles.nameText}>성별 : {gender}</Text>
                            <Text style={styles.nameText}>전화번호 : {mobile}</Text>
                            <Text style={styles.nameText}>생년월일 : {birthyear}-{birthday}</Text>
                        </ScrollView>   
                    </View>
                
                    <ScrollView style={styles.container}>
               {
                   tip.map((content,i)=>{
                       return(
                       <WriteCardProfile key={i} content={content} navigation={navigation}/>)
                   })
               }
            </ScrollView>
                </ScrollView>
    
                
            </View>
        )
    }

    if(service == "kakao"){
        let user_id = global.id;
        let name = global.name.nickname
        let email = global.email.email
        let profile_image = global.profile_image.profile_image
        let mobile = global.mobile.mobile
        if(mobile == undefined){
            mobile = "지정 안됨"
        }
        let birthday = global.birthday.birthday
        if(birthday == undefined){
            birthday = "지정 안됨"
        }
        let gender = global.gender.gender
        if(gender == undefined){
            gender = "지정 안됨"
        }else{
            if(gender == "male"){
                gender = "남성"
            }

            if(gender == "female"){
                gender = "여성"
            }
        }

        return ready ? <Loading/> : (
            <View style={styles.container}>
                <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'ProfileScreen'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
                <View style={styles.titlecontainer}>
                
                    <Text style={styles.title}>내 정보</Text>
                    <TouchableOpacity style={styles.profileedit} onPress={() => {
                        Alert.alert("죄송합니다.","아직 개발중인 기능입니다.")
                    }} ><Text style={styles.profileedittext}>수정하기</Text></TouchableOpacity>
                </View>
    
                <ScrollView style={styles.desccontainer}>
                    <View style={styles.topcontainer1}>
                    <Image style={styles.profileimage} source={{uri:profile_image}}></Image>
                        <View style={styles.namecontainer}>
                            <Text style={styles.nameText}>이름 : {name}</Text>
                            <Text style={styles.nameText}>이메일 : {email}</Text>
                            <Text style={styles.nameText}>성별 : {gender}</Text>
                            <Text style={styles.nameText}>생일 : {birthday}</Text>
                        </View>   
                    </View>
                
                    <ScrollView style={styles.container}>
               {
                   tip.map((content,i)=>{
                       return(
                       <WriteCardProfile key={i} content={content} navigation={navigation}/>)
                   })
               }
            </ScrollView>
                </ScrollView>
    
                
            </View>
        )
    }
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
       fontSize:30,
       marginTop:0,
       textAlign:'center',
       marginLeft:80
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
      }
})