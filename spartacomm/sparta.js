import React, { useRef, useEffect, useState } from 'react';

import { StyleSheet,Text,Image,View, Alert, BackHandler, useWindowDimensions} from "react-native";
import *  as Linking from 'expo-linking'

import { WebView } from 'react-native-webview';

import axios from 'axios';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import '../global.js'

export default function sparta({navigation, route}){
  

    
  const loading = require("../assets/loading.gif");
    //console.log(`https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&course=${global.course}&pageChunkSize=9999&curPage=${page}&userId=626be1411d008bf29af0e436&courseKeyword=${global.courseKeyword}&`)
  /** 스파르타 api와 통신하여데이터 가져오기 */
    const requestList = async (page) => {
      if(global.course.length > 0){
        // 과목선택이 된 검색
        if(global.search == "true"){
          var returnValue = "none";

          var request_token_url = `https://api.scc.spartacodingclub.kr/community?text=${global.search_keyword}&channelName=fastqna&sort=latest&course=${global.course}&pageChunkSize=10&curPage=${page}&courseKeyword=${global.courseKeyword}&`;
        }else{

          var returnValue = "none";

          var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&course=${global.course}&pageChunkSize=10&curPage=${page}&courseKeyword=${global.courseKeyword}&`;
        }
      }else{
        // 과목선택이 안된 검색
        if(global.search == "true"){
          var returnValue = "none";

          var request_token_url = `https://api.scc.spartacodingclub.kr/community?text=${global.search_keyword}&channelName=fastqna&sort=latest&pageChunkSize=10&curPage=${page}`;
        }else{
          if(global.user_write == "true"){
            var returnValue = "none";

            var request_token_url = `https://api.scc.spartacodingclub.kr/community-user/${global.user_write_id}/posts/?sort=latest&pageChunkSize=10&curPage=${page}&activityStatus=posts&userId=${global.user_write_id}&`;
          }else{

            var returnValue = "none";

            var request_token_url = `https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&pageChunkSize=10&curPage=${page}`;
          }

        }
      }

 

        axios({

            method: "get",

            url: request_token_url,

            withCredentials:true,


        }).then(function (response) {
            returnValue = response.data.data;
            let array = []
            returnValue.map((content ,i) => {
                //console.log(i, content)
                
                let id = content._id
                let author = content.author.name
                let authordata = content.author
                let profile = `https://spartacodingclub.kr/v5/images/profile/${content.author.profile}.png`
                let commentCount = content.commentCount
                let title = content.title
                let status = content.tutorResponse.status
                let answeredDate = content.tutorResponse.answeredDate
                let firstViewedDate = content.tutorResponse.firstViewedDate
                let viewCount = content.viewCount
                let week = content.week
                let desc = content.content
                let likeCount = content.likeCount
                let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                let imagelist = []
                if(image != null){
                    image.map((link, i) => {
                        image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                        let image2 = link.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                        if(image2.split('undefined')[1] == undefined){
                          imagelist.push(image)
                        }else{
                          imagelist.push(image+image2.split('undefined')[1].replace('\">',""))
                        }
                    })
                }
                
                let codesnipet = desc.match(/<pre class="ql-syntax" spellcheck="false">(.*)<\/pre>/ims)
                desc = desc.replace(/\r/gi, "")
                desc = desc.replace(/<p><br><\/p>/g, "")
                desc = desc.replace(/<\/p>/g, '\n')
                desc = desc.replace(/<[^>]*>?/g, '')
                desc = desc.replace(/&lt;/g,'{lt}')
                desc = desc.replace(/&gt;/g,'{gt}')
                desc = desc.replace(`"`,"")
                desc = desc.replace(/&nbsp/gi, '\n')
                desc = desc.replace(/{/gi, '{')
                desc = desc.replace(/}/gi, '}')
                desc = desc.replace(/;/gi, '')
                desc = desc.replace(/@/gi, '\n@')

                if(codesnipet != null){
                  codesnipet.map((code, i) => {
                    code = code.replace(/\r/gi, "")
                    code = code.replace(/<p><br><\/p>/g, "")
                    code = code.replace(/<\/p>/g, '\n')
                    code = code.replace(/<[^>]*>?/g, '')
                    code = code.replace(/&lt;/g,'<')
                    code = code.replace(/&gt;/g,'>')
                    code = code.replace(`"`,"")
                    code = code.replace(/&nbsp/gi, '\n')
                    code = code.replace(/{/gi, '{')
                    code = code.replace(/}/gi, '}')
                    code = code.replace(/;/gi, '')
                    code = code.replace(/@/gi, '\n@')
                    
                    if(desc.includes(code)){
                      //desc = desc.replace(code,`code${i}`)
                    }

                  })
                }
                let createdAt = content.createdAt
                let courseTitle = content.courseTitle  
                
                
                let comm = {
                    author, commentCount, title, id, status, answeredDate, firstViewedDate, viewCount, week, desc, createdAt, courseTitle, imagelist, profile, codesnipet, likeCount, authordata
                }
                array.push(comm)
                
            })
            navigation.navigate('Viewsparta',{navigation, array, page})
            

 

        }).catch(function (error) {

          //Alert.alert('서버와 통신중에 오류가 발생했습니다.', error.message);
          navigation.navigate('MainPage')


        });

    };


    useEffect(() => {
        let page = route.params
        if(page == undefined){
            page = 1
        }else{
          if(page.page == undefined){
            page = 1
          }else{
            page = page.page
          }
        }
        requestList(page)

        const backAction = () => {
      
            navigation.navigate("MainPage")
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()
    })

    return(
        <SafeAreaView style={styles.container}>
          <Image source={loading} alt="progress" style = {styles.loading} />
      </SafeAreaView>
    )
}

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
      },
      container: {
        flex: 1,
        backgroundColor: "white",
      },
      textBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    
      profileBox: {
        marginHorizontal: 30,
      },
      inputBox: {
        marginHorizontal: 40,
        marginVertical: 20,
      },
      loading:{
        alignSelf:"center",
        resizeMode: 'contain'
      }
})