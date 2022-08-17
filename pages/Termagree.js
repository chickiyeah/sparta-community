import React, {useState,useEffect}from 'react';

import { StyleSheet,Text,View,Button, Alert, Image, ScrollView, BackHandler} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import '../global.js'
import {firebase_db} from "../firebaseConfig";

export default function Termagree({navigation}) {
    const [isChecked, setChecked] = useState(false);
    useEffect(() => {
        const backAction = () => {
            
                Alert.alert('여기선 뒤로 갈수 없습니다!', `이용약관 창에선 뒤로 가기를 사용할 수 없습니다.
이용약관을 동의하고 계속하기를 눌러주세요!`)
    
                return true;
              };
          
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
        return () => backHandler.remove()
    },[])
    
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.refresh} onPress={() => {navigation.reset({index: 0, routes:[{name:'Termagree'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
            <View style={styles.titlecontainer}>

                <Text style={styles.title}> 모든 기능을 사용하기 위해서는 이용 약관에 동의 하셔야합니다. </Text>
            </View>
            <ScrollView style={styles.desccontainer}>
                <Text>0. 사용자 약관을 위반하는경우 서비스 이용이 주의 없이 정지될수있습니다. 이 항이후로 부터 사용자는 을 앱(개발자)는 갑으로 표시합니다.</Text>
                <Text>1. 을의 닉네임이 부적절한 닉네임(부적절한 닉네임의 정의는 1-a에 정의 되어있습니다.)일시 갑은 서비스 가입시 사용한 이메일로 최대 2차례에 한하여 경고 메일을 전송하며 
                    그래도 닉네임이 변경되지 않는경우 갑에 의해 게시물 작성권한, 댓글 달기이 박탈당할수 있습니다.
                </Text>
                <Text>1-a. 부적절한 닉네임의 정의는 다음과 같습니다. 다른 사용자에게 불편을 주는 단어(욕설, 성, 정치 등)이/가 포함된 닉네임.</Text>
                <Text>2. 을이 게시한 게시글(꿀팁)의 이미지, 내용이 다른 사용자에게 불편을 주는 부분이 있다면 게시물이 갑의 확인후 정당한 신고였다고 판단되면 게시 정지 되고 갑은 게시자에게
                    가입시 사용한 이메일로 신고된 글의 정보와 신고된 부분을 적어 전송합니다. 게시자는 갑에게 게시정지 안내 이메일을 인용해 항의를 진행할수 있습니다.
                </Text>
                <Text>2-a. 단 게시글에 개인정보가 포함된경우, 갑의 판단시 너무 부적절한 내용,이미지가 포함된 경우 게시글이 무경고 삭제됩니다.</Text>
                <Text>3. 사용자 약관이 변경될수 있으며 이경우 이메일로 약관이 변경됬음을 변경된 점과 같이 통보하고 앱에서 약관 동의를 다시하게 처리합니다.</Text>
            </ScrollView>

            <View style={styles.agreecontainer}>
                <Checkbox style={styles.termcheck} value={isChecked} onValueChange={setChecked}/>
                <Text style={styles.termchecktext}>이용 약관 동의하기</Text>
            </View>
            <Button onPress={() => {
                Alert.alert('이용 약관에 동의하셨습니다.','메인 페이지로 이동합니다. 이제 모든 서비스를 사용할수 있습니다.')
                navigation.reset({index: 0, routes:[{name:'MainPage'}]})
                let id = global.id
                let name = global.name.nickname
                if(name == undefined){
                    name = global.nickname.nickname
                }
                let email = global.email.email
                firebase_db.ref(`/term/${id}/agreed`).set(true)
                firebase_db.ref(`/term/${id}/name`).set(name)
                firebase_db.ref(`/term/${id}/email`).set(email)
                
                }} disabled={!isChecked} title='계속하기'/>
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
        height:60,
        backgroundColor:"red",
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
       marginLeft:18,
       color:"white"
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
        height:200,
        marginTop:20,
        marginLeft:17.5,
        marginBottom:100,
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
    agreecontainer:{
        flexDirection:"row",
        marginLeft:20,
        marginBottom:20
    },
    termcheck:{
        marginRight:8
    }


})