import React,{useState, useEffect, PureComponent} from 'react';
import RN, {BackHandler, ScrollView, Text, StyleSheet, Alert, Image, View, useWindowDimensions, Share, Animated } from 'react-native';
import SpartaCardComment from '../components/SpartaCardComment';
import * as Linking from 'expo-linking';
import AutoHeightImage from "react-native-auto-height-image";
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import '../global.js';
import { SliderBox } from 'react-native-image-slider-box';
import RNJsxParser from 'react-native-jsx-parser'
import { copyAsync } from 'expo-file-system';
loaded = false;


export default function Detailsparta({route, navigation, beforeid}){
    let scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width);

    let { width } = useWindowDimensions()
    let content = route.params.content
    let id = content.id
    let courseTitle = content.courseTitle
    let week = content.week
    let title = content.title
    let image = content.image

    let lt = React.createElement(
      RN['Text'], 
      {style:{color:"pink"}}, // here may be an object with attributes if your node has any
      '<',
    )

    let gt = React.createElement(
      RN['Text'],
      {style:{color:"pink"}}, // here may be an object with attributes if your node has any
      '>',
    )
    
    function mapStringToComponent(stringToRender, list) {
      let haslt = false
      let hasgt = false
      if(stringToRender.includes("{lt}")){
        haslt = true
        //stringToRender = stringToRender.replace(/{lt}/g, "")
      }else{
        haslt = false
      }
      if(stringToRender.includes("{gt}")){
        hasgt = true
        //stringToRender = stringToRender.replace(/{gt}/g, "")
      }else{
        hasgt = false
      }
      let parseResult = stringToRender.match(/<([a-z]*)>(.*)<\/[a-z]*>/i);
      if(parseResult == null){
        parseResult = stringToRender.match(/<([a-z]*) (.*)<\/[a-z]*>/i);
      }
      
       // result of this regex ["<Text>hello</Text>", "Text", "hello"]
      if (parseResult !== null && parseResult.length == 3) {
        let [, compName, innerText] = parseResult;
        let style = ''
        if(innerText.includes("style")){
          style = innerText.match(/style={styles.([a-z]*)}>/i)
          if(style != null){
            code = style[0]
            innerText = innerText.replace(code, "")
            code = code.replace(">", "")
            code = '{'+code+'}'
            if(haslt == true && hasgt == true){
              list.push(React.createElement(
                RN[compName],
                {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                innerText.split(/{lt}/g)[0],lt,innerText.split(/{gt}/g)[0].replace("{lt}", "").trim(),gt,innerText.split(/{gt}/g)[1]
              ));
            }else{
              if(haslt == true){
                list.push(React.createElement(
                  RN[compName],
                  {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                  innerText.split(/{lt}/g)[0],lt,innerText.split(/{lt}/g)[1]
                ));
              }else{
                if(hasgt == true){
                  list.push(React.createElement(
                    RN[compName],
                    {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                    innerText.split(/{gt}/g)[0].replace("{lt}", ""),gt,innerText.split(/{gt}/g)[1]
                  ));
                }else{
                  list.push(React.createElement(
                    RN[compName],
                    {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                    innerText,
                  ));                  
                }
              }

            }
              list.push(React.createElement(
                RN[compName],
                {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                innerText,
              ));
          }
        }else{
          if(innerText.length != 1){
            if(compName == 'Text'){
              if(haslt == true && hasgt == true){
                if(innerText.includes("{gt}{lt}/")){
                  if(innerText.split(/{gt}/g)[0].includes("{lt}")){
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText.split(/{gt}/g)[0].split(/{lt}/g)[0],lt,innerText.split(/{gt}/g)[0].split(/{lt}/g)[1],gt,innerText.split(/{lt}/g)[0].replace(innerText.split(/{lt}/g)[0], "").replace("{lt}", "").trim(),lt,innerText.split(/{gt}/g)[1].replace("{lt}",""),gt
                    ));   
                  }else{
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText.split(/{gt}/g)[0],gt,innerText.split(/{lt}/g)[0].replace(innerText.split(/{lt}/g)[0], "").replace("{lt}", "").trim(),lt,innerText.split(/{gt}/g)[1].replace("{lt}",""),gt
                    ));   
                  }
             
                }else{
                  if(innerText.split(/{gt}/g)[1].includes("{lt}")){
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText.split(/{lt}/g)[0],lt,innerText.split(/{gt}/g)[0].replace(innerText.split(/{lt}/g)[0], "").replace("{lt}", "").trim(),gt,innerText.split(/{gt}/g)[1].split(/{lt}/g)[0],lt,innerText.split(/{gt}/g)[1].split(/{lt}/g)[1],gt
                    ));
                  }else{
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText.split(/{lt}/g)[0],lt,innerText.split(/{gt}/g)[0].replace(innerText.split(/{lt}/g)[0], "").replace("{lt}", "").trim(),gt,innerText.split(/{gt}/g)[1]
                    ));
                  }

                }

              }else{
                if(haslt == true){
                  list.push(React.createElement(
                    RN[compName],
                    null, // here may be an object with attributes if your node has any
                    innerText.split(/{lt}/g)[0],lt,innerText.split(/{lt}/g)[1]
                  ));
                }else{
                  if(hasgt == true){
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText.split(/{gt}/g)[0].replace("{lt}", ""),gt,innerText.split(/{gt}/g)[1]
                    ));
                  }else{
                    list.push(React.createElement(
                      RN[compName],
                      null, // here may be an object with attributes if your node has any
                      innerText,
                    ));
                  }
                }
              }
            }else{
              if(compName == 'head'){
                list.push(React.createElement(
                  RN['Text'],
                  {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                  '<head>',
                ));
              }

              if(compName == 'body'){
                list.push(React.createElement(
                  RN['Text'],
                  {style:{color:"pink"}}, // here may be an object with attributes if your node has any
                  '<body>',
                ));
              }
            }
          }
        }

        

      }
    
      return null
    }
    

    const [Desc, setDesc] = useState('');

    let array = []
    let bef = ""
     
    const [ready,setReady] = useState(true)
    const [comm, setcomm] = useState(array)
    let curcourse = ``
    if(week == 100){
        curcourse = `즉문즉답 > ${courseTitle} > 기타`
    }else{
        curcourse = `즉문즉답 > ${courseTitle} > ${week}주차`
    }

    /*function uploadcomment() {
        var returnValue = "none";

        var request_token_url = `https://api.scc.spartacodingclub.kr/community/62dbdc19697492e2920e2b42/comment`;

 

        axios({

            method: "post",

            url: request_token_url,

            withCredentials:true,

            headers :{
                ":authority": "api.scc.spartacodingclub.kr",
                "accept": "application/json, text/plain"
            },

            params :{
                attachFiles: [],
                content: "<p> 댓글 테스팅 </p>",
                postId: "62dbdc19697492e2920e2b42",
                userId: "626be1411d008bf29af0e436"
            }


        }).then(function (response) {
    
            console.log("success", response)
 

        }).catch(function (error) {

            console.log('error', error);

        });

    } 위험 구역 위험 구역*/

    function getcomment() {

        if(loaded == false){ //로드할려는 데이터가 같은 거인 경우 무한 반복으로 실행되는 버그 수정!
            var { idx } = route.params;
            var returnValue = "none";

            var request_token_url = `https://api.scc.spartacodingclub.kr/community/${id}/comment`;
    
     
    
            axios({
    
                method: "get",
    
                url: request_token_url,
    
                withCredentials:true,
    
    
            }).then(function (response) {
                returnValue = response.data.data;
    
                returnValue.map((content ,i) => {
                    let id = content._id
                    let author = content.author.name
                    let isTutor = content.author.isTutor
                    let isWriter = content.author.isWriter
                    let profile = content.author.profile
                    let createdAt = content.createdAt
                    let desc = content.content
                    let imagelist = []
                    let image2 = ""
                    let image = desc.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)
                    
                    if(image != null){
                        image.map((link, i) => {
                            
                            image = link.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            let image2 = link.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
                            imagelist.push(image+image2.split('undefined')[1].replace('\">',""))
                        })
                    }
                    console.log(author, id, desc, createdAt, isTutor, isWriter, profile, imagelist)
                    desc = desc.replace(/\r/gi, "")
                    desc = desc.replace(/<p><br><\/p>/g, "")
                    desc = desc.replace(/<\/p>/g, '\n')
                    desc = desc.replace(/<[^>]*>?/g, '')
                    desc = desc.replace(/;/g,"")
                    desc = desc.replace(/&lt/g,'{lt}')
                    desc = desc.replace(/&gt/g,'{gt}')
                    desc = desc.replace(/&nbsp/gi, ' ')
                    desc = desc.replace(/{/gi, '{')
                    desc = desc.replace(/}/gi, '}')
                    desc = desc.replace(/@/gi, '\n@')
                    let comm = {
                        author, id, desc, createdAt, isTutor, isWriter, profile, imagelist
                    }
                    
                    array.push(comm)
                    
    
                })
                
                loaded = true
                //setcomm(array)
                
                setReady(false)
    
     
    
            }).catch(function (error) {
    
                console.log('error', error);
    
            });
            loaded = true //로드가 되었다고 표시
            bef = idx
        }else{
            console.log("still running")
            if(idx  != bef){ //로드할려는 데이터가 다른 거인 경우!
                loaded = false //로드 완료를 취소하고 재로드를 실시한다.
            }
        }
        

    }
    useEffect(() => {
        title = content.title
      if(global.mode == "API"){
        if(beforeid == undefined){
            getcomment()
        }else{
            if(title != beforeid){
                beforeid = title
                //getcomment()
            }
        }
      }

        const backAction = () => {
      
                navigation.goBack()
    
                return true;
              };
          
              const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
          
              return () => backHandler.remove()

        
})

if(content.week == 100){
    curcourse = `즉문즉답 > ${content.courseTitle} > 기타`
}else{
    curcourse = `즉문즉답 > ${content.courseTitle} > ${content.week}주차`
}
let descmap = []
let date = ``
let time = ``
let a = `  `
if(content.createdAt != null){
date = content.createdAt.split("T")[0].split("-")
time = content.createdAt.split("T")[1].split(".")[0].split(":")
let ms = content.createdAt.split("T")[1].split(".")[1].replace("Z", "")
let aa = ``
let hour = ``
if(time[0] > 12){
  aa = "오후"
  hour = time[0] - 12
}else{
  aa = "오전"
  hour = time[0]
}
function formatDate(date) {
  return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`)
}
var write = new Date(content.createdAt);
var now = new Date();

let year = now.getFullYear()
let month = now.getMonth()
let day = now.getDate()
let hours = now.getHours()+9
let minutes = now.getMinutes()
let seconds = now.getSeconds()

let nowdate = new Date(year, month, day, hours, minutes, seconds)

let elti = nowdate.getTime() - write.getTime()

let chai = elti

let a = ``

let desc = `<Text>${content.desc}</Text>`

desc = desc.replace(/\n/gi, '</Text>\n<Text>')

desc = desc.replace(/<Text><\/Text>/g, "")

desc = desc.replace(/<Text></sg, '<Text style={styles.lt}><')

//desc = mapStringToComponent(desc);

let descsplit = desc.split("\n")

descsplit.map((value, i) => {
  mapStringToComponent(value, descmap)
})


if(chai < 1000 * 60)
  a = '방금';
else if(chai < 1000 * 60 * 60)
  a += Math.floor(chai / (1000 * 60)) + ' 분전';
else if(chai < 1000 * 60 * 60 * 24)
  a += Math.floor(chai / (1000 * 60 * 60)) + ' 시간전';
else if(chai < 1000 * 60 * 60 * 24 * 30)
  a += Math.floor(chai / (1000 * 60 * 60 * 24)) + ' 일전';
else if(chai < 1000 * 60 * 60 * 24 * 30 * 12)
  a += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + ' 달전';

  
  if(content.week == 100){
    curcourse = `즉문즉답 > ${content.courseTitle} > 기타`
}else{
    curcourse = `즉문즉답 > ${content.courseTitle} > ${content.week}주차`
}
date = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${aa} ${hour}시 ${time[1]}분 `
}

const share = () => {
  Share.share({
      message:`https://spartacodingclub.kr/community/fastqna/all/${id}/${content.title}`,
  });
}
  if(content.imagelist != null){
    if(content.imagelist.length != 0){
        return (
            <ScrollView style={styles.main}> 
                <View style={styles.cardText}>
                <View style={styles.cardTop}>
              <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
                <Text style={styles.cardTitle} numberOfLines={1}> {content.author}</Text>
                <TouchableOpacity onPress={() => {share()}}><Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={require('../assets/share.png')}></Image></TouchableOpacity>
              </View>
                    <Text style={styles.cardTitle}>{content.title}</Text>
                    <Text style={styles.cardDate}>{curcourse}</Text>
                    <View style={{ width:width, height: '100%', flex: 1 ,alignContent:"stretch"}}>
                        <SliderBox
                            
                            autoplay={false}  //자동 슬라이드 넘김
                            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
                            resizeMode="cover"  // 이미지 사이즈 조절값
                            images={content.imagelist} // 이미지 주소 리스트 
                            dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
                            inactiveDotColor="rgba(0,0,0,0)"
                            onCurrentImagePressed={index => Linking.openURL(content.imagelist[index])}
                        />
                    </View>
                    <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                    <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{date}            작성자 : {content.author}                 {a}</Text>
                
                </View>
                <ScrollView>
                {
                    comm.map((content,i)=>{
                        return(
                        <SpartaCardComment key={i} content={content} navigation={navigation}/>)
                    })
                }   
                </ScrollView>

            </ScrollView>
        )
    }else{
        return (
            <ScrollView style={styles.main}> 
                <View style={styles.cardText}>
                <View style={styles.cardTop}>
              <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
                <Text style={styles.cardTitle} numberOfLines={1}> {content.author}</Text>
                <TouchableOpacity onPress={() => {share()}}><Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'cover',borderRadius:5}} source={require('../assets/share.png')}></Image></TouchableOpacity>
              </View>
                    <Text style={styles.cardTitle}>{content.title}</Text>
                    <Text style={styles.cardDate}>{curcourse}</Text>
                    <View style={styles.cardDesc}>
                      <Text style={styles.lt}></Text>
                      {descmap.map((value) => {return(value)})}
                    </View>
                    <Text style={styles.cardDate}>{content.createdAt}  작성자 : {content.author}   {a}</Text>
                
                </View>
                <ScrollView>
                {
                    comm.map((content,i)=>{
                        return(
                        <SpartaCardComment key={i} content={content} navigation={navigation}/>)
                    })
                }   
                </ScrollView>
                <View style={styles.input}>

                </View>
            </ScrollView>
        )        
    }
  }else{
    return (
      <ScrollView style={styles.main}> 
          <View style={styles.cardText}>
          <View style={styles.cardTop}>
        <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
          <Text style={styles.cardTitle} numberOfLines={1}> 관리자</Text>
        </View>
              <Text style={styles.cardTitle}>{content.title}</Text>
              <Text style={styles.cardDate}>공지사항</Text>
              <View style={styles.cardDesc}>
                <Image style={styles.cardImage} source={{uri:content.image}}/>
                <Text>{content.desc}</Text>
              </View>
          
          </View>
          <View style={styles.input}>

          </View>
      </ScrollView>
  )        
  }
}

const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700",
      marginRight:"auto"
    },
    cardDesc: {
      fontSize:15
    },
    cardDesc2: {
        fontSize:15,
        fontWeight:"800",
        marginBottom:10,
        borderBottomWidth:0.5,
        borderLeftWidth:0.5,
        borderTopWidth:0.5,
        borderRightWidth:0.5,
        marginTop:10,
        alignSelf:"center",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:3,
        paddingBottom:3
        
        
      },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    buttonGroup: {
        flexDirection:"row"
    },
    button:{
        width:90,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:'deeppink',
        borderRadius:7
    },
    buttonText:{
        color:'deeppink',
        textAlign:'center'
    },
    image:{
        alignSelf:'center',
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        borderBottomColor:"#aaa"
    },
    cardTop:{
        flexDirection:"row",
        borderBottomWidth:0.5,
        borderBottomColor:"#aaa",
        flex:1
      },
      inputDesc: {
        width: 300,
        height: 50,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        alignSelf:"auto"
      },
      input:{
        flexDirection:"row"
      },
      button2:{
        marginLeft:10
      },
      main:{
        marginTop:30
      },
      lt:{
        color:"#FFFF00"
      }
}); 