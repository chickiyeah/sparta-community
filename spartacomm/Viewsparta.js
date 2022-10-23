import React,{useState, useEffect, Component} from 'react';
import {BackHandler, ScrollView, Text, StyleSheet, Alert, Button, View} from 'react-native';
import SpartaCard from '../components/SpartaCard';
import Loading from '../components/Loading';
import {firebase_db} from "../firebaseConfig"
import { createStackNavigator } from 'react-navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MainHeader from "../components/MainHeader";
import MainHeaderJa from "../components/MainHeaderJa"
import sparta from './sparta';
import '../global.js'
import { ToastAlert } from '../components/Alert';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Viewsparta({navigation, route}) {
    const [tip, setTip] = useState([])
    const [ready,setReady] = useState(true)
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    let loaded = false

    const [Caterory, setCategory] = useState([
      {label: '최신순', value: 'latest'},
      {label: '추천순', value: 'best'},
    ]);
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [Caterory1, setCategory1] = useState([
      {label: '0주차', value: '0'},
      {label: '1주차', value: '1'},
      {label: '2주차', value: '2'},
      {label: '3주차', value: '3'},
      {label: '4주차', value: '4'},
      {label: '5주차', value: '5'},
      {label: '전체 주차', value: ''},
    ]);

    useEffect(() => {
      setTip(route.params.array)
    })
     let page = route.params.page
     if(page == undefined){
      page = 1
  }
    
     function goBack() {
      page -= 1
      navigation.navigate('sparta', {navigation, page})
     }

     function goNext( ) {
        page += 1
        navigation.navigate('sparta', {navigation, page})

     }

     function goBackJa() {
      page -= 1
      navigation.navigate('spartaja', {navigation, page})
     }

     function goNextJa( ) {
        page += 1
        navigation.navigate('spartaja', {navigation, page})

     }

     function search() {
      global.search = "true"
      global.search_keyword = text
      page = 1
      //ToastAlert(`검색의 경우 1페이지에 모든 데이터가 표시됩니다!`)
      navigation.navigate('sparta', {navigation, page})
     }

     function searchja() {
      global.search = "true"
      global.search_keyword = text
      page = 1
      //ToastAlert(`검색의 경우 1페이지에 모든 데이터가 표시됩니다!`)
      navigation.navigate('spartaja', {navigation, page})
      
     }
  if(global.selpage == "quiz"){
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.refresh} onPress={() => {global.search = "false",global.user_write = "false",navigation.reset({index: 0, routes:[{name:'sparta'}]})}}><Text style={styles.refreshtext}>즉문즉답 눌러서 새로 고침</Text></TouchableOpacity>
              <MainHeader/>
              <DropDownPicker style={{zIndex:9, width: "50%"}}
     placeholder='최신순'
      open={open}
      value={value}
      items={Caterory}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCategory}
      scrollViewProps={true}
    />
                  <DropDownPicker style={{width: "50%",zIndex:8}}
     placeholder='전체 주차'
      open={open1}
      value={value1}
      items={Caterory1}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setCategory1}
      scrollViewProps={true}
      listMode="SCROLLVIEW"
    />
          <View style={{zIndex:2}}>
              <TextInput style = {{backgroundColor:"gray",height:50}} placeholder={"검색할 것을 입력하세요."} onChangeText={(keyworld) => {setText(keyworld)}}></TextInput>
              <Button title='검색'  onPress={() => {search()}}></Button>
              </View>
              {
                   tip.map((content,i)=>{
                    if(global.search == "true"){
                      if((content.title.includes(global.search_keyword) || content.desc.includes(global.search_keyword) || content.author.includes(global.search_keyword)) == true){
                        return(
                        <View style={{zIndex:3}}>
                        <SpartaCard key={i} content={content} navigation={navigation}/>
                        </View>)
                        }
                      }else{
                        return(
                          <View style={{zIndex:4}}>
                          <SpartaCard key={i} content={content} navigation={navigation}/>
                          </View>)
                                                  
                      }
                   })
               }
          <View style={{zIndex:2}}>

            <Text style={styles.searchinfo}>검색 / 특정 작성자의 글보기 상태를 헤제하고 싶으시다면 새로고침을 눌러주세요!</Text>
          </View>
            <View style={styles.button}>
             <Button style={styles.buttonleft} title="이전 페이지" disabled={page == 1} onPress={goBack} />
             <Button style={styles.buttonright} title="다음 페이지" disabled={page == 50} onPress={goNext} />
            </View>
        </ScrollView>
    )
  }else{
    return (
      <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.refresh} onPress={() => {global.search = "false",global.user_write = "false",navigation.reset({index: 0, routes:[{name:'spartaja'}]})}}><Text style={styles.refreshtext}>눌러서 새로 고침</Text></TouchableOpacity>
            <MainHeaderJa/>
            <DropDownPicker
     placeholder='카테고리를 선택하세요.'
      open={open}
      value={value}
      items={Caterory}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCategory}
    />
            <TextInput style = {{backgroundColor:"gray",height:50}} placeholder={"검색할 것을 입력하세요."} onChangeText={(keyworld) => {setText(keyworld)}}></TextInput>
              <Button title='검색'  onPress={() => {searchja()}}></Button>
            {
                 tip.map((content,i)=>{
                  if(global.search == "true"){
                    if((content.title.includes(global.search_keyword) || content.desc.includes(global.search_keyword) || content.author.includes(global.search_keyword)) == true){
                      return(
                      <SpartaCard key={i} content={content} navigation={navigation}/>)
                      }
                    }else{
                      return(
                        <SpartaCard key={i} content={content} navigation={navigation}/>)
                                                
                    }
                 })
             }
          <View>

            <Text style={styles.searchinfo}>검색 / 특정 작성자의 글보기 상태를 헤제하고 싶으시다면 새로고침을 눌러주세요!</Text>
          </View>
          <View style={styles.button}>
           <Button style={styles.buttonleft} title="이전 페이지" disabled={page == 1 || global.search == "true"} onPress={goBackJa} />
           <Button style={styles.buttonright} title="다음 페이지" disabled={page == 50 || global.search == "true"} onPress={goNextJa} />
          </View>
      </ScrollView>
  )
  }

}



const styles = StyleSheet.create({
    searchinfo:{
      textAlign:"center",
      marginBottom:5
    },
    container:{
        backgroundColor:"#fff",
        zIndex:1
    },
    refresh: {
        backgroundColor:"pink",
        
        height:40,
        borderRadius:10,
        alignSelf:"center",
        paddingLeft:25,
        paddingRight:25,
        marginLeft:5,
        marginRight:5,
        marginTop:10
      },
      refreshtext: {
        color:"#fff",
        textAlign:"center",
        fontSize:30
      },
      button: {
        flexDirection:"row",
        justifyContent:"space-between"
      },
      buttonleft: {
        marginLeft: 50,
        flex : 0.5
      },
      buttonright: {
        marginLeft: 30,
        flex: 0.5
      },
      middleContainer:{
        marginTop:20,
        marginLeft:10,
        marginBottom:60,
        borderColor:"black",
        borderWidth:2,
        height:60
      },
      middleButtonAll: {
        width:100,
        height:50,
        padding:15,
        backgroundColor:"#20b2aa",
        borderColor:"deeppink",
        borderRadius:15,
        margin:7
      },
      middleButton01: {
        width:100,
        height:50,
        padding:15,
        backgroundColor:"#fdc453",
        borderColor:"deeppink",
        borderRadius:15,
        margin:7
      },
      middleButton02: {
        width:100,
        height:50,
        padding:15,
        backgroundColor:"#fe8d6f",
        borderRadius:15,
        margin:7
      },
      middleButton03: {
        width:100,
        height:50,
        padding:15,
        backgroundColor:"#9adbc5",
        borderRadius:15,
        margin:7
      },
      middleButton04: {
        width:100,
        height:50,
        padding:15,
        backgroundColor:"#f886a8",
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

      //desc 색상 선택
      lt: {
        color:"#808080"
      }
})

