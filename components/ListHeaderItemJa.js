import { Button } from "native-base";
import '../global.js'
import * as RootNavigation from '../RootNavigation.js';

export default function ListHeaderItem({ navigation, title }) {
  const showCates = () => {
    //https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&course=web&pageChunkSize=10&curPage=1&userId=626be1411d008bf29af0e436&courseKeyword=web&
    let course = ``
    let courseKeyword = ``
    if(title == "전체"){course = '', courseKeyword = ''}
    if(title == "아무말 대잔치"){course = 'bunch_of_words', courseKeyword = 'bunch_of_words'}
    if(title == "스터디/프로젝트 팀원 모집"){course = 'team_recruitment', courseKeyword = 'team_recruitment'}
    if(title == "외주 의뢰"){course = 'outsourcing', courseKeyword = 'outsourcing'}
    if(title == "기타"){course = 'etc', courseKeyword = 'etc'}


    global.search = "false"
    global.course = course
    global.courseKeyword = courseKeyword
    RootNavigation.navigate('spartaja', { course, courseKeyword });
  };

  return (
    <Button size="sm" variant="ghost" onPress={showCates}>
      {title}
    </Button>
  );
}
