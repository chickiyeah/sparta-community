import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import DetailPage from '../pages/DetailPage';
import MainPage from '../pages/MainPage';
import loginsuccess from '../LoginScreen/loginsuccess';
import kakaoLogin from '../LoginScreen/kakao/kakaoLogin';
import kakaoLogout from '../LoginScreen/kakao/KaKaoLogout';
import tipmake from '../pages/tipmake';
import writepage from '../pages/WritePage';
import EditPage from '../pages/EditPage';
import SelectLogin from '../LoginScreen/SelectLogin'
import NaverLogin from '../LoginScreen/Naver/NaverLogin';
import NaverLogout from '../LoginScreen/Naver/NaverLogout';
import Termagree from '../pages/Termagree'
import LoginGoogle from '../LoginScreen/google/GoogleLogin';
import sparta from '../spartacomm/sparta';
import Viewsparta from '../spartacomm/Viewsparta';
import Detailsparta from '../spartacomm/Detailsparta';
import Selcourse from '../spartacomm/Selcourse';
import spartaja from '../spartacomm/spartaja';
import Noti from '../spartacomm/Noti';

//스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
//그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
const Stack = createStackNavigator();


const StackNavigator = () =>{
    return (

        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        <Stack.Navigator
            /*screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "white",
                    shadowColor: "white",
                    height:100
                },
                //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
                headerTitleAlign:'left',
                headerTintColor: "#000",
                headerBackTitleVisible: false
            }}*/
            screenOptions={{ headerShown: false }}
            
        >

            {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
            <Stack.Screen name="MainPage" component={MainPage}/>
            <Stack.Screen name="DetailPage" component={DetailPage}/>
            <Stack.Screen name="loginsuccess" component={loginsuccess}/>
            <Stack.Screen name="kakaoLogin" component={kakaoLogin}/>
            <Stack.Screen name="kakaoLogout" component={kakaoLogout}/>
            <Stack.Screen name="tipmake" component={tipmake}/>
            <Stack.Screen name="WritePage" component={writepage}/>
            <Stack.Screen name="EditPage" component={EditPage}/>
            <Stack.Screen name="SelectLogin" component={SelectLogin}/>
            <Stack.Screen name="NaverLogin" component={NaverLogin}/>
            <Stack.Screen name="NaverLogout" component={NaverLogout}/>
            <Stack.Screen name="Termagree" component={Termagree}/>
            <Stack.Screen name="GoogleLogin" component={LoginGoogle}/>
            <Stack.Screen name="sparta" component={sparta}/>
            <Stack.Screen name="Viewsparta" component={Viewsparta}/>
            <Stack.Screen name="Detailsparta" component={Detailsparta}/>
            <Stack.Screen name="Selcourse" component={Selcourse}/>
            <Stack.Screen name="spartaja" component={spartaja}/>
            <Stack.Screen name="noti" component={Noti}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;
export { StackNavigator };