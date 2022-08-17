import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FreeBoardPage from "../spartacomm/FreeboardPage";
import MainPage from "../spartacomm/MainPage";

import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "스파르타 커뮤니티",
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#ff0000",
      }}>
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          title: "즉문즉답",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FreeBoard"
        component={FreeBoardPage}
        options={{
          title: "자유게시판",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
