import { Button } from "native-base";
import '../global.js'
import * as RootNavigation from '../RootNavigation.js';

export default function ListHeaderItem({ navigation, title }) {
  const showCates = () => {
    //https://api.scc.spartacodingclub.kr/community?channelName=fastqna&sort=latest&course=web&pageChunkSize=10&curPage=1&userId=626be1411d008bf29af0e436&courseKeyword=web&
    let course = ``
    let courseKeyword = ``
    if(title == "전체"){course = '', courseKeyword = ''}
    if(title == "앱개발종합반"){course = 'app', courseKeyword = 'app'}
    if(title == "웹개발종합반"){course = 'web', courseKeyword = 'web'}
    if(title == "웹개발종합반 (내배단)"){course = 'start_gov', courseKeyword = 'start_gov'}
    if(title == "액셀보다 쉬운 SQL"){course = 'sql', courseKeyword = 'sql'}
    if(title == "무료특강"){course = 'free_myprofile', courseKeyword = 'free_myprofile'}


    global.search = "false"
    global.course = course
    global.courseKeyword = courseKeyword
    RootNavigation.navigate('sparta', { course, courseKeyword });
  };

  return (
    <Button size="sm" variant="ghost" onPress={showCates}>
      {title}
    </Button>
  );
}
