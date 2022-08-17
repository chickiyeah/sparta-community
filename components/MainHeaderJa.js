import {
  View,
  Text,
  HStack,
  Box,
  Button,
  Center,
} from "native-base";
import { StyleSheet, ScrollView } from "react-native";
import ListHeaderItem from "./ListHeaderItemJa";

export default function ListHeader() {
  return (
    <ScrollView style = {{flexDirection:"row"}} horizontal>
      <HStack justifyContent="center">
        <ListHeaderItem title="전체" />
        <ListHeaderItem title="아무말 대잔치" />
        <ListHeaderItem title="스터디/프로젝트 팀원 모집" />
        <ListHeaderItem title="외주의뢰" />
        <ListHeaderItem title="기타" />
        
      </HStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "gray",
  },
});
