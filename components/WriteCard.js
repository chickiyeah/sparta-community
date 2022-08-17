import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity, Alert, RefreshControl} from 'react-native'
import {firebase_db} from "../firebaseConfig"
import '../global.js'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { NavigationActions } from 'react-navigation';


//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function LikeCard({content,navigation}){

    const detail = () => {
        navigation.navigate('DetailPage',{idx:content.idx})
    }

    const edit = () => {
      navigation.navigate('EditPage',{idx:content.idx})
    }

    const remove = () => {
        const user_id = global.id;
        
            Alert.alert("정말 삭제하시겠습니까?",`이미지를 서버에서 삭제하고 싶다면 개발자에게 문의해주세요.
            이 작업은 취소할 수 없습니다. 
            삭제한 글은 서버에서 완전히 삭제됩니다.`, [
              {
                  text:'취소',
                  onPress: () => Alert.alert('삭제가 취소되었습니다.', '사용자가 삭제를 취소했습니다.'),},
              {
                  text:'확인',
                  onPress: () => {
                    firebase_db.ref('/tip/'+content.idx).remove()
                    firebase_db.ref('/write/'+user_id+'/'+content.idx).remove().then(function(){
                      Alert.alert("삭제 완료","성공적으로 글을 삭제했습니다.")
                      navigation.reset({index: 0, routes:[{name:'WritePage'}]})
                    })},
               }]);
            
            setRefreshing(true);
        
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    return(
        //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
        <TouchableOpacity style={styles.card} onPress={() => detail()}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
                
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={()=>edit()}><Text style={styles.buttonText}>수정하기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>remove()}><Text style={styles.buttonText}>삭제하기</Text></TouchableOpacity>
              
                </View>
            </View>
        </TouchableOpacity>
    )
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
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
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
    }
});