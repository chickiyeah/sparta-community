import React from 'react';
import RN, {View, Image, Text, StyleSheet,TouchableOpacity, Alert, RefreshControl, Linking} from 'react-native'
import {firebase_db} from "../firebaseConfig"
import '../global.js'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';


//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function SpartaCard({content,navigation}){

    let array = []
    const detail = () => {
      array.push({content})
      global.mode = "API"
      navigation.navigate('Detailsparta', {content})
      //console.log(content.desc)s
        //Linking.openURL(`https://spartacodingclub.kr/community/fastqna/all/${content.id}/${content.title}`)
    }
//aa
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
        
    let curcourse = ``


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

    if(global.selpage.toString() == "free"){
      console.log("success")
      curcourse = `자유게시판 > ${content.courseTitle}`
    }else{
      console.log("fail")
      if(content.week == 100){
        curcourse = `즉문즉답 > ${content.courseTitle} > 기타`
      }else{
          curcourse = `즉문즉답 > ${content.courseTitle} > ${content.week}주차`
      }
    }
    let date = content.createdAt.split("T")[0].split("-")
    let time = content.createdAt.split("T")[1].split(".")[0].split(":")
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
    let mode = global.search

    let elti = nowdate.getTime() - write.getTime()

    let chai = elti

    let a = ``
    let descmap = []

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

        

      }else{
        if(stringToRender != ""){
          list.push(React.createElement(
            RN['Text'],
            null, // here may be an object with attributes if your node has any
            stringToRender,
          ));
        }
      }
    
      return null
    } 
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
      a += Math.floor(chai / 1000 / 60) + ' 초전';
    else if(chai < 1000 * 60 * 60)
      a += Math.floor(chai / (1000 * 60)) + ' 분전';
    else if(chai < 1000 * 60 * 60 * 24)
      a += Math.floor(chai / (1000 * 60 * 60)) + ' 시간전';
    else if(chai < 1000 * 60 * 60 * 24 * 30)
      a += Math.floor(chai / (1000 * 60 * 60 * 24)) + ' 일전';
    else if(chai < 1000 * 60 * 60 * 24 * 30 * 12)
      a += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + ' 달전';

    
    date = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${aa} ${hour}시 ${time[1]}분 ${time[2]}초 `
    let keyworld = global.search_keyword
          return(
              //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
              <TouchableOpacity style={styles.card} onPress={() => detail()}>
                    <View style={styles.cardTop}>
                    <Image style={{ width: 20,height:20,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5}} source={{uri:content.profile}} />
                      <Text style={styles.cardTitle} numberOfLines={1}> {content.author}</Text>
                    </View>

                    <View style={styles.cardText}>
                      <Text style={{fontWeight:"600"}} numberOfLines={1}>제목 : {content.title}</Text>
                      <Text style={styles.cardDesc} numberOfLines={1}>{content.desc}</Text>
                      <Text style={styles.cardDate}>{curcourse}</Text>     
                  </View>

                  <View style={styles.cardday}>
                    <Image style={{ width: 10,height:10,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5,marginLeft:10}} source={require('../assets/view.png')}></Image>
                    <Text style={styles.cardDate}>{content.viewCount}  </Text>
                    <Image style={{ width: 10,height:10,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5,marginLeft:10}} source={require('../assets/like.png')}></Image>
                    <Text style={styles.cardDate}>{content.likeCount}  </Text>
                    <Image style={{ width: 10,height:10,margin:(0,0,0,3),resizeMode: 'contain',borderRadius:5,marginLeft:10}} source={require('../assets/comment.png')}></Image>
                    <Text style={{fontSize:10,color:"#A6A6A6",textAlign:"left",marginRight:"auto"}}>{content.commentCount}  </Text>
                    <Text style={styles.cardElst}>{a}   </Text>
                  </View>
              </TouchableOpacity>
          )
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"column",
      margin:10,
      borderBottomWidth:2,
      borderTopWidth:0.5,
      borderLeftWidth:0.5,
      borderRightWidth:2,
      borderBottomColor:"pink",
      borderTopColor:"pink",
      borderLeftColor:"pink",
      borderRightColor:"pink",
      paddingBottom:10,
      borderRadius:5
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
      borderBottomWidth:0.5,
      borderBottomColor:"#aaa"
    },
    cardTitle: {
      fontSize:18,
      fontWeight:"700",
      borderLeftWidth:0.5,
      borderLeftColor:"#aaa",
      marginRight:5
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
      textAlign:"left"
    },
    buttonGroup: {
        flexDirection:"row",
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
    cardTop:{
      flexDirection:"row",
      borderBottomWidth:0.5,
      borderBottomColor:"#aaa"
    },
    cardElst:{
      fontSize:10,
      color:"#A6A6A6",
      textAlign:"right"
    },
    cardEls:{
      flexDirection:"row"
    },
    cardday:{
      flexDirection:"row" 
    }
});