import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking} from 'react-native';
import * as Notifications from 'expo-notifications';
import KakaoLogin from '../LoginScreen/kakao/kakaoLogin';
import { requestlist } from '../components/kakaoPush';

export default function ProfileScreen({navigation}) {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<TouchableOpacity style={styles.aboutButton} onPress={() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "버튼을 눌러 알림 발생",
        body: '버튼을 눌러 알림을 생성했습니다!',
      },
      trigger: {
        seconds: 1, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
      },
    });
  }}>
          <Text style={styles.aboutButtonText}>눌러서 알림 발생</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutButton} onPress={() => {requestlist()}}>
          <Text style={styles.aboutButtonText}>눌러서 스파르타 이동 알림</Text>
        </TouchableOpacity>
</View>
   );   
 }

 const styles = StyleSheet.create({
    aboutButton: {
        backgroundColor:"pink",
        width:100,
        height:40,
        borderRadius:10,
        alignSelf:"flex-end",
        marginRight:20,
        marginTop:10
      },
      aboutButtonText: {
        color:"#fff",
        textAlign:"center",
        marginTop:10
      }
 })