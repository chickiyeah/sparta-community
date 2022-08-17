import {
  View,
  Text,
  HStack,
  Box,
  Button,
  Center,
} from "native-base";
import { StyleSheet, ScrollView } from "react-native";
import ListHeaderItem from "./ListHeaderItem";

export default function ListHeader() {
  return (
    <ScrollView style = {{flexDirection:"row"}} horizontal>
      <HStack justifyContent="center">
        <ListHeaderItem title="전체" />
        <ListHeaderItem title="앱개발종합반" />
        <ListHeaderItem title="웹개발종합반" />
        <ListHeaderItem title="웹개발종합반 (내배단)" />
        <ListHeaderItem title="액셀보다 쉬운 SQL" />
        <ListHeaderItem title="무료특강" />
        
      </HStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "gray",
  },
});
