import { HStack } from "native-base";
import ListHeaderItem from "./ListHeaderItem";

export default function FreeHeader() {
  return (
    <HStack justifyContent="center">
      <ListHeaderItem title="전체" />
      <ListHeaderItem title="아무말" />
      <ListHeaderItem title="인원모집" />
      <ListHeaderItem title="외주의뢰" />
      <ListHeaderItem title="기타" />
    </HStack>
  );
}
