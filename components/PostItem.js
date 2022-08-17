import {
  Box,
  Text,
  HStack,
  Heading,
  VStack,
  Center,
  Avatar,
  Pressable,
  Divider,
  Spacer,
} from "native-base";
import { StyleSheet } from "react-native";

export default function PostItem({ navigation, data }) {
  const showDetail = () => {
    navigation.navigate('Detailsparta', {data})
  };


  let curcourse = ``
  if(data.week == 100){
      curcourse = `즉문즉답 > ${data.courseTitle} > 기타`
  }else{
      curcourse = `즉문즉답 > ${data.courseTitle} > ${data.week}주차`
  }
  let date = data.createdAt.split("T")[0].split("-")
  let time = data.createdAt.split("T")[1].split(".")[0].split(":")
  let ms = data.createdAt.split("T")[1].split(".")[1].replace("Z", "")
  let aa = ``
  let hour = ``
  if(time[0] > 12){
    aa = "오후"
    hour = time[0] - 12
  }else{
    aa = "오전"
    hour = time[0]
  }
  function formatDate(date) {
    return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`)
  }
  
  var write = new Date(data.createdAt);
  var now = new Date();

  let year = now.getFullYear()
  let month = now.getMonth()
  let day = now.getDate()
  let hours = now.getHours()+9
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()

  let nowdate = new Date(year, month, day, hours, minutes, seconds)

  let elti = nowdate.getTime() - write.getTime()

  let chai = elti

  let a = ``

  if(chai < 1000 * 60)
    a += Math.floor(chai / 1000 / 60) + ' 초전';
  else if(chai < 1000 * 60 * 60)
    a += Math.floor(chai / (1000 * 60)) + ' 분전';
  else if(chai < 1000 * 60 * 60 * 24)
    a += Math.floor(chai / (1000 * 60 * 60)) + ' 시간전';
  else if(chai < 1000 * 60 * 60 * 24 * 30)
    a += Math.floor(chai / (1000 * 60 * 60 * 24)) + ' 일전';
  else if(chai < 1000 * 60 * 60 * 24 * 30 * 12)
    a += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + ' 달전';

    
    if(data.week == 100){
      curcourse = `즉문즉답 > ${data.courseTitle} > 기타`
  }else{
      curcourse = `즉문즉답 > ${data.courseTitle} > ${data.week}주차`
  }
  date = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${aa} ${hour}시 ${time[1]}분 `

  return (
    <Pressable onPress={showDetail} style={styles.cardContainer}>
      <Box alignItems="center" alignSelf="center">
        <VStack>
          <Box style={styles.cardHeader}>
            <HStack space={4}>
              <Center>
                <Avatar source={{ uri: data.profile }} size="48px" />
              </Center>
              <Center alignItems="flex-start">
                <Heading size="sm">{data.author}</Heading>
              </Center>
            </HStack>
          </Box>
          <Divider h={2} />
          <Box alignItems="center" alignSelf="center">
          <Text style={{fontWeight:"600"}} numberOfLines={1}>제목 : {data.title}</Text>
            <Text numberOfLines={2}>
              {data.desc}
            </Text>
          </Box>

          <Box m={2}>
            <HStack>
              <Box>
                <Text>{date}</Text>
              </Box>
              <Spacer />
              <Box aligndata="flex-end">
                <Text>{a}</Text>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    margin: 10,
    borderColor: "pink",
    backgroundColor: "white",
    borderRadius: 12,
  },
  cardHeader: {
    margin: 5,
  },
});
