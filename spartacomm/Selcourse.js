import React, {useState,useEffect}from 'react';

import { StyleSheet,Text,View,BackHandler, Alert, Image, ScrollView} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig";

import WriteCardProfile from '../components/WriteCardProfile';
import '../global.js'


export default function Selcourse({navigation}) {
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    const [Return, setReturn] = useState(false)
    let loaded = false
    useEffect( ()=>{
        const backAction = () => {
      
            navigation.reset({index: 0, routes:[{name:'MainPage'}]})
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()
    },[])



        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'ProfileScreen'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
                <View style={styles.titlecontainer}>
                
                    <Text style={styles.title}>과목을 선택하세요!</Text>
                </View>
    
                <ScrollView >
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>전체 보기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>웹개발 종합반</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>Digital Transformation</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>내배단 웹개발 종합반</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>내배단 앱개발 종합반</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>앱개발 종합반</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>SQL</Text></TouchableOpacity>
                <TouchableOpacity style={styles.desccontainer}><Text style={styles.title}>나만의 프로필 만들기</Text></TouchableOpacity>
            
                </ScrollView>
    
                
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
        alignItems:"center",
        flexDirection:"row"
        
    },
    title: {
       fontSize:30,
       marginTop:0,
       textAlign:'center',
        flex:1
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
        marginTop:20,
        marginLeft:17.5,
        marginBottom:5,
        borderRadius:20,
        backgroundColor:"gray",
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