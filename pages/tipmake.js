//React Native TextInput
//https://aboutreact.com/react-native-textinput/

//import React in our code
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import { StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, Platform, Button, Image, Alert, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {firebase_db} from "../firebaseConfig";
import Loading from '../components/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';


import firebase from 'firebase/compat/app'

import { firebaseConfig } from '../firebaseConfig';
import * as FileSystem from 'expo-file-system';
import "firebase/compat/storage";
import '../global.js'






export default function tipmake({navigation}){
  if (!firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  //기존 꿀팁을 저장하고 있을 상태  

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [state,setState] = useState([])
  //카테고리에 따라 다른 꿀팁을 그때그때 저장관리할 상태
  const [cateState,setCateState] = useState([])
  const [ready,setReady] = useState(true)
  const [Name, setName] = useState('');
  const [Desc, setDesc] = useState('');
  
  const[isChecked,setChecked] = useState(false)

  const [currentDate, setCurrentDate] = useState('');
  const [percent, setPercent] = useState(0);
  const [Caterory, setCategory] = useState([
    {label: '생활', value: '생활'},
    {label: '재테크', value: '재테크'},
    {label: '반려견', value: '반려견'},
    {label: '기타', value: '기타'}
  ]);

  useEffect(()=>{


    (async () => {
      if(Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted")
          Alert.alert("오류","폴더 접근 권한을 부여받지 못했습니다.");
          //navigation.reset({index: 0, routes:[{name:'MainPage'}]})
        }
    })();
	   
    //뒤의 1000 숫자는 1초를 뜻함
    setTimeout(()=>{    //1초 뒤에 실행되는 코드들이 담겨 있는 함수
    
        //헤더의 타이틀 변경
        firebase_db.ref('/tipindex').once('value').then((snapshot) => {
          console.log("파이어베이스에서 데이터 가져왔습니다!!")
          let tip = snapshot.val();
          setState(tip)
          setCateState(tip)
          setReady(false)
        });
    },1000)

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      year+ '.' + month + '.' + date
    );

    const backAction = () => {
      
      Alert.alert('잠시만요!', '작성을 종료하고 메인페이지로 돌아가시겠나요?', [
        {
          text: '아니요',
          onPress: () => null,
          style: 'cancel',
        },
        { text: '네', onPress: () => navigation.reset({index: 0, routes:[{name:'MainPage'}]}) },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
   
  },[]);



const pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  const localUri = pickerResult.uri;
  setImage(localUri)

  const filename = localUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : `image`;
  const formdata = new FormData;
  
  
  formdata.append('image', { uri: localUri, name: filename, type})

  if (!pickerResult.cancelled) {
    setImage(localUri)
    uploadImage(localUri)
  }
};

function gohome(){
  console.log("gohome")
  navigation.reset({index: 0, routes:[{name:'MainPage'}]})
}

const uploadImage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("네트워크 오류가 발생하였습니다."));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  let index = state + 1
  const ref = firebase.storage().ref().child(new Date().toISOString());

  const snapshot = ref.put(blob);

  snapshot.on(
    
    firebase.storage.TaskEvent.STATE_CHANGED,
    () => {
      
      setUploading(true);
    },
    (error) => {
      setUploading(false);
      console.log(error);
      blob.close();
      return;
    },
    () => {
      snapshot.snapshot.ref.getDownloadURL().then((url) => {
        setUploading(false);
        console.log("다운 링크 : ",url);
        setImage(url)
        alert("업로드를 완료했습니다!")
        blob.close();
        return url;
      });
    }
  )

}



  return ready ? <Loading/> :   (
    <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          
        <View style={styles.container}>
          
            <Text>당신만의 꿀팁을 여기에 적어주세요!!</Text>
            <Text>단. 제목, 내용, 이미지가 모두 들어가야합니다!</Text>
            <TextInput
            value={Name}
            onChangeText={(Name) => setName(Name)}
            placeholder={'제목'}
            style={styles.inputName}
            />
    <DropDownPicker
     placeholder='카테고리를 선택하세요.'
      open={open}
      value={value}
      items={Caterory}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCategory}
    />

            <TextInput
            value={Desc}
            onChangeText={(Desc) => setDesc(Desc)}
            placeholder={'내용'}
            style={styles.inputDesc}
            />
         <Button title="여기를 눌러 이미지를 선택하세요" onPress={pickImage} />
         <Text>선택한 이미지가 아래에 표시됩니다.</Text>
         <Text>이미지 업로드 완료 창이 뜨면 글쓰기를 눌러주세요!</Text>
             {image && <Image source={{ uri: image }} style={{marginTop:20, width: 200, height: 200 }} />}

        
        </View>
        

        <View style={styles.agreecontainer}>
                <Checkbox style={styles.termcheck} value={isChecked} onValueChange={setChecked}/>
                <Text style={styles.termchecktext}>이용 약관을 인지하고 동의하며 글 작성시 벌어지는 피해는 작성자 본인이 지겠습니다.</Text>
        </View>
        <Button title="글쓰기" disabled={!isChecked} onPress={() => {Alert.alert("글 쓰기 확인","정말 작성하시겠습니까?", [
        {
            text:'취소',
            onPress: () => Alert.alert('작성이 취소되었습니다.', '사용자가 작성을 취소했습니다.'),},
        {
            text:'확인',
            onPress: () => {
                if(Name != ""){
                    if(value != null){
                        if(Desc != ""){
                            if(image != null){
                                let index = state + 1
                                let id = global.id
                                let writer = global.name.nickname
                                console.log("index",index)
                                let newtip = {
                                    category:value,
                                    date:currentDate,
                                    desc:Desc,
                                    idx:index,
                                    image:image,
                                    title:Name,
                                    writer:writer,
                                    writerid:id                              
                                 }
                                
                                
                                Alert.alert('작성을 시작합니다.', 'DB에 연결중입니다.')


                                firebase_db.ref(`/tipindex`).set(index)
                                firebase_db.ref(`/write/${id}/${index}`).set(newtip),
                                firebase_db.ref(`/tip/${index}`).set(newtip,function(error){
                                    console.log(error)
                                    Alert.alert("등록 완료!", "성공적으로 꿀팁을 등록했습니다!",[
                                      {
                                        text:'확인',
                                        onPress: () => gohome()}
                                    ])
                                })
                                //firebase_db.ref(`/tip/${index}/image`).set(file,)

                                

                                
                            }else{
                                Alert.alert("등록 불가", "이미지가 비어있습니다.")
                            }
                        }else{
                            Alert.alert("등록 불가", "내용란이 비어있습니다.")
                        }
                    }else{
                        Alert.alert("등록 불가", "카테고리를 선택하지 않았습니다.")
                    }        
                }else{
                    Alert.alert("등록 불가", "제목란이 비어있습니다.")
                }
        }},])
        
        }}
        />
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  inputName: {
    width: 350,
    height: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  inputDesc: {
    width: 350,
    height: 800,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  agreecontainer:{
    flexDirection:"row",
    marginLeft:20,
    marginBottom:20
},
termcheck:{
    marginRight:8
}
});