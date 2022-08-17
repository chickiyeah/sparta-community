import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert} from 'react-native';
//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import { DrawerContentScrollView, DrawerItemList, DrawerItem , createDrawerNavigator } from '@react-navigation/drawer';
import AboutPage from '../pages/AboutPage';
import LikePage from '../pages/LikePage';
import SettingsScreen from '../pages/Settings';
import ProfileScreen from '../pages/Profile';
import StackNavigator from './StackNavigator';
import {Ionicons} from '@expo/vector-icons';
import {Webview} from 'react-native-webview';
import kakaoLogin from '../LoginScreen/kakao/kakaoLogin';
import kakaoLogout from '../LoginScreen/kakao/KaKaoLogout';
import loginsuccess, {route} from '../LoginScreen/loginsuccess';
import Selcourse from '../spartacomm/Selcourse';
import DetailPage from '../pages/DetailPage';
import Viewsparta from '../spartacomm/Viewsparta';
import Noti from '../spartacomm/Noti';
import { registerForPushNotificationsAsync } from '../components/Alert';
import AboutGather from '../spartacomm/AboutGather';

import { nicname2 } from '../pages/Settings';
import '../global.js'
const Drawer = createDrawerNavigator();
export const myComponent = () => {
  // Get the global variables & functions via context
  const myContext = useContext(AppContext);
}


function HeaderR() {
  let id = global.id
    return (  <TouchableOpacity onPress={() => {Alert.alert("죄송합니다","이 앱은 알림이 제공되지 않습니다.")/*registerForPushNotificationsAsync("add")*/}}><Ionicons name="notifications-outline"size={30}></Ionicons></TouchableOpacity>);
   
  }

export const CustomDrawer = props => {
    //const data = loginsuccess();
    let profile_image = global.profile_image.profile_image
    let birthday = global.birthday.birthday
    let name = global.name.nickname
    let id = global.id
    if(name == undefined){
      let name = global.name.name
    }
    
    if(id == undefined || id.length == 0){
    return (

      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#f6f6f6',
              marginBottom: 10,
            }}
          >
            <View>
              <Text>로그인 안됨</Text>
              
            </View>
            <Ionicons name="person-circle-outline"size={35}></Ionicons>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            left: 10,
            bottom: 90,
            backgroundColor: '#009DAE',
            padding: 10,
            borderRadius: 3
          }}onPress={() => {Linking.openURL("https://forms.gle/21uVV8DzCwSFHiUh9")}}
        >
          <Text style = {styles.logoutText}>피드백</Text>
          
        </TouchableOpacity>
      </View>
    );}else{
      return (
        <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#f6f6f6',
              marginBottom: 10,
            }}
          >
            <View>
              <Text>{name}님 안녕하세요!</Text>
              <Text style={styles.id}>ID : {id}</Text>
            </View>
            <Image style={styles.mainImage} source={{uri:profile_image}}></Image>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
    }
  };

const DrawerNavigator = (navigator) =>{
    return (
<Drawer.Navigator initialRouteName="Home" screenOptions={{
    headerShown: true,
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitle: '',
    
}}
drawerContent={props => <CustomDrawer {...props}/>}
>
        <Drawer.Screen name="MainPage" component={StackNavigator}  options={{drawerLabel: '메인',title:'나의 꿀팁',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 
        <Drawer.Screen name="AboutGather" component={AboutGather}  options={{drawerLabel: '스온스',title:'나의 꿀팁',
        headerTitle: () => (
            <TouchableOpacity onPress={() => {}}><Image style={{ width: 100,height:40,resizeMode: 'contain' }} source={require("../assets/icon.png")} /></TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerRight: ()=> <HeaderR/>,
          headerRightContainerStyle: {paddingRight: 10},
          headerLeftContainerStyle: {paddingRight: 10}
        }}/> 


</Drawer.Navigator>
)}
const styles = StyleSheet.create({
    logoutBox: {
      //position: 'absolute',
      flex: 1,
      width:200,
      height:0,
      backgroundColor: '#009DAE',
    },
    logoutText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      //marginLeft: 30
    },
    mainImage: {
      //컨텐츠의 넓이 값
      width: 50,
      //컨텐츠의 높이 값
      height:50,
      //컨텐츠의 모서리 구부리기
      borderRadius:10,
      //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
      //각 속성의 값들은 공식문서에 고대로~ 나와 있음
      alignSelf:"center"
    },
    id:{
      fontSize:5
    }
  })

export default DrawerNavigator;
export {DrawerNavigator};