import React,{ useRef } from 'react';
//이제 모든 페이지 컴포넌트들이 끼워져있는 책갈피를 메인에 둘예정이므로
//컴포넌트를 더이상 불러오지 않아도 됩니다.
// import MainPage from './pages/MainPage';
// import DetailPage from './pages/DetailPage';
import { StatusBar } from 'expo-status-bar';

//메인에 세팅할 네비게이션 도구들을 가져옵니다.
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import * as Notifications from 'expo-notifications';
import { BackHandler, Linking,Alert, LogBox } from 'react-native';
import { navigationRef } from './RootNavigation';
import * as Analytics from 'expo-firebase-analytics';
import {
  useNavigationContainerRef,
} from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import './global.js'
import { ref } from 'firebase/storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  LogBox.ignoreAllLogs(true)
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  //const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  React.useEffect(() => {


    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      Linking.openURL(lastNotificationResponse.notification.request.content.data.url);
    }
  }, [lastNotificationResponse]);
  return ( 
<NativeBaseProvider>
  <NavigationContainer
  ref={navigationRef}
  onReady={() => {
    routeNameRef.current = navigationRef.getCurrentRoute().name;
  }}
  onStateChange={async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      // The line below uses the expo-firebase-analytics tracker
      // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      // Change this line to use another Mobile analytics SDK
      
      await console.log('now',currentRouteName);
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
    //console.log("now",currentRouteName)
  }}
  
  >
    <StatusBar style="black" />
    <DrawerNavigator/>

 </NavigationContainer>
 </NativeBaseProvider>);
}
