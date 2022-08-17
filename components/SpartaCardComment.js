import React from 'react';
import RN, {View, Image, Text, StyleSheet,TouchableOpacity, Alert, RefreshControl, useWindowDimensions} from 'react-native'
import {firebase_db} from "../firebaseConfig"
import '../global.js'
import AutoHeightImage from "react-native-auto-height-image";
import { SliderBox } from 'react-native-image-slider-box';
import * as Linking from 'expo-linking';


//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function SpartaCardComment({content,navigation}){

    let array = []
    let { width } = useWindowDimensions();
    const detail = () => {
      array.push({content})
      navigation.navigate('Detailsparta', {content})
      //console.log(content.desc)s
        //Linking.openURL(`https://spartacodingclub.kr/community/fastqna/all/${content.id}/${content.title}`)
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
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
    let descsplit = desc.split("\n")

    descsplit.map((value, i) => {
      mapStringToComponent(value, descmap)
    })
    console.log(descmap)    

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
  
  let elti = nowdate.getTime() - write.getTime()
  
  let chai = elti
  
  let a = ``
  
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
  
    
  date = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${aa} ${hour}시 ${time[1]}분 `

    if(content.imagelist.length != 0){
        let image = content.image
        if(content.isTutor == true){
          if(content.isWriter == true){
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
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
                      <Text style={styles.cardDate}>{content.author}  튜터, 작성자          {a}</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
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
                      <Text style={styles.cardDate}>{content.author}  튜터          {a}</Text>
                      
                  </View>
              </View>
            )            
          }
        }else{
          if(content.isWriter == true){
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
                  <View style={{ width:'50%', height: '100%', flex: 1 ,alignContent:"stretch"}}>
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
                      <Text style={styles.cardDate}>{content.author} 작성자       {a}</Text>
                      
                  </View>
              </View>
           )
          }else{
            return(
              <View style={styles.card} onPress={() => detail()}>
                  <View style={styles.cardText}>
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
                        <Text style={styles.cardDesc2}>이미지를 터치하면 이미지의 링크로 이동합니다.</Text>
                    </View>
                    
                    <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                      <Text style={styles.cardDate}>{content.author}       {a}</Text>
                      
                  </View>
              </View>
            )            
          }
        }
    }else{
      if(content.isTutor == true){
        if(content.isWriter == true){
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{content.author}  튜터, 작성자       {a}</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{content.author}  튜터       {a}</Text>
                    
                </View>
            </View>
          )            
        }
      }else{
        if(content.isWriter == true){
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{content.author} 작성자        {a}</Text>
                    
                </View>
            </View>
         )
        }else{
          return(
            <View style={styles.card} onPress={() => detail()}>
                <View style={styles.cardText}>
                <View style={styles.cardDesc}>{descmap.map((value) => {return(value)})}</View>
                    <Text style={styles.cardDate}>{content.author}       {a}</Text>
                    
                </View>
            </View>
          )            
        }
      }    
    }
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10,
      backgroundColor:"#ccc",
      borderRadius:5,
      paddingTop:10
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
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      marginTop:10,
      fontSize:10,
      color:"white",
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
    image:{
        alignSelf:'center',
        marginRight:10,
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
      
      
    }
});