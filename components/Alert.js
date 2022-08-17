import '../global.js'
import { Alert, Platform, ToastAndroid } from 'react-native'
import { Snackbar } from 'react-native-paper';
import * as Device from 'expo-device';
import {firebase_db} from "../firebaseConfig";
import * as Notifications from 'expo-notifications';
import axios from 'axios'

export function TempAlert(){

}

export function MakeLocalAlert(title, body, uri){
    Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: {
            uri: uri
          }
        },
        trigger: {
          seconds: 1, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
        },
      });
}

export function MakeGlobalAlert(title, body){
    firebase_db.ref(`/push/token`).once('value').then((push) => {
      let tokenlist = []
      firebase_db.ref(`/push/token`).once('value').then((push) => {
        push.val().forEach(token => {
          tokenlist.push(token)
          console.log(tokenlist)
        })
          MakeAlert("dd","fdsfdffd", tokenlist)
      })
    })
}

export function ToastAlert(message){
  if(Platform.OS != 'android'){
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT
    })
  }else{
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
}

export function SnackAlert(message){

    return(
      <Snackbar
        visible={true}
        duration={5000}
      >
        스파르타코딩클럽에 오신걸 환영합니다!!
      </Snackbar>
    );
  /*Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT
  }) */
}

export function MakeAlert(title, body, token){

    var returnValue = "none";

    console.log(token)
    const message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'goes here' },
      };

      

      axios('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          //Authorization: 'beraer AIzaSyD1BSo47GRJmv6QK2QwBnyzZapQF5dmZRY ',
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(message),
      

    /*axios({

        method: "post",

        url: request_token_url,

        withCredentials:true,
        headers: {
            Authorization: 'key=AAAADHFTspY:APA91bEP5D1Y2J8-iDkZggU3JsoXFgglESqSL322PYNRpFx8WG1EzQzHpb0lWJrIwK9OzDHkRuM2fdRuUljpu2Xwt4YeAQA2eu38n07-G5HDPdKBCT_kY98QYuwCnkhOGfY6v-NkrxrS'
        },
        params: {

            to: token,

            priority:'normal',

            data: {
                experienceId: '@ruddls030/sparta-myhoneytip-nkw',
                scopeKey: '@ruddls030/sparta-myhoneytip-nkw',
                title: title,
                message: body,
            },

        },*/

    }).then(function (response) {
        returnValue = response.data;
        console.log('token',returnValue)
        //



    }).catch(function (error) {

        console.log('error', error.response.data);

    })
}

export async function registerForPushNotificationsAsync() {
    let id = global.id
    console.log(id)
    let token;
    if(id == undefined || id.length == 0){
        Alert.alert("오류","먼저 로그인 해주세요.")
    }
    else
    {
            if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                alert("grant failed")
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            } else {
            alert('Must use physical device for Push Notifications');
            }
        
            if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
            }
        firebase_db.ref(`/user/${id}/pushindex`).once('value').then((pindex) => {
            if(pindex.exists()){
                Alert.alert("모든 알림을 헤제하시겠습니까?","자세한 알림 설정은 설정창을 사용해주세요.")
                SnackAlert("스파르타코딩클럽에 오신걸 환영합니다!!")
                ToastAlert("스파르타코딩클럽에 오신걸 환영합니다!!")

            }else{
                firebase_db.ref('/pushindex').once('value').then((index) => {    
                    firebase_db.ref(`/user/${id}/pushindex`).set(parseInt(JSON.stringify(index)))
                    firebase_db.ref(`/push/token/`+JSON.stringify(index)).set(token);
                    index = parseInt(JSON.stringify(index)) + 1;
                    console.log("pusg333",index)

                    firebase_db.ref(`/pushindex`).set(index);
                });
            }
            
        });
    }
  }

  export async function pushAlarm(title, body, totalLength, req, res, next ){


    try {
      //const { title, content } = req.body;
      //const [tokenList] = await mysqlRead.query(`SELECT push_token FROM app_push_token WHERE permission = 'Y'`, []);
      let pushList = [];
      //const totalLength = tokenList.length;
      const tokenListLengthForPush100Limit = parseInt(totalLength / 100);
      const expectedOutput = totalLength % 100;
  
      for (let i = 0; i < tokenListLengthForPush100Limit; i++) {
        let limit = 100 * i;
        firebase_db.ref(`/push/token`).once('value').then((push) => {
            push.val().forEach(token => {
                if(token != null){
                    pushList.push(token);

                
                }
            });
        })

        
        const message = {
            to: token,
            sound: 'default',
            title: title,
            body: body,
            data: { someData: 'goes here' },
          };
  
          
    
          await axios('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Authorization: 'key=BI8zNSvz_dwLVnVIlE7Q7P8nKm89oFy1o_gDiBB_kGqPyqys4tb0hr8gHlMD7tNC2vFRFz3TPNs9NGMG3TAoDg8',
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(message),
          });

        pushList = [];
      }
  
      // 100 나누기 나머지 보내기
      for (let i = tokenListLengthForPush100Limit * 100; i < tokenListLengthForPush100Limit * 100 + expectedOutput; i++) {
        firebase_db.ref(`/push/token`).once('value').then((push) => {
            push.val().forEach(token => {
                if(token != null){
                    pushList.push(token);
                }
            });
        })
      }
  
      const message = {
        to: pushList,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'goes here' },
      };
  
      await axios('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(message),
      });
  
      //return res.status(200).json({ msg: 'success' });
    } catch (err) {
      console.log(err.response.data);
      //return res.status(400).json({ msg: 'fail' });
    }
  };