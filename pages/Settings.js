import * as React from 'react';
import { View, Text } from "react-native";
import * as AuthSession from 'expo-auth-session';


const url = AuthSession.getRedirectUrl();
console.log("https://nid.naver.com/oauth2.0/authorize?response_type=idToken&client_id=yourClientId&redirect_uri="+{url})
export default function SettingsScreen() {
   return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={{fontSize:16,fontWeight:'700'}}>`https://nid.naver.com/oauth2.0/authorize?response_type=idToken&client_id=yourClientId&redirect_uri=${url}`</Text>
</View>
   );
 }


 const naverLogin = async () => {
    const result = await AuthSession.startAsync({
      authUrl: "https://nid.naver.com/oauth2.0/authorize?response_type=idToken&client_id=yourClientId&redirect_uri="+{url},
    });

    if (result.type === "success") {
      const code = result.params.code;
      mutate({
        id_token: code,
        provider: "NAVER",
      });
    }
  };