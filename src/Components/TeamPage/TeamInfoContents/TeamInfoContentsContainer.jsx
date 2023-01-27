//import components
import TeamInfo from "./TeamInfo"
import TeamBoard from "./TeamBoard"
import ChatLog from "./ChatLog"
import Management from "./Management"
import TeamBoardDetail from "./TeamBoardDetail"
import TeamBoardWrite from "./TeamBoardWrite"
import TeamBoardModify from "./TeamBoardModify"
//import atom
import { useSetRecoilState } from "recoil";
import atomTeamSelectedMenu from "../../../Atoms/atomTeamSelectedMenu"


function TeamInfoContentsContainer({ currentSelectMenu, teamBelong }) {
    //현재 선택된 메뉴에 대한 값을 갖고 있는 recoil set 함수
    const setSelectedMenu = useSetRecoilState(atomTeamSelectedMenu);

    if(currentSelectMenu === "TeamInfo") {
        return (
            <TeamInfo teamBelong={teamBelong}></TeamInfo>
        )
    }
    else if(currentSelectMenu === "TeamBoard") {
        return (
            <TeamBoard></TeamBoard>
        )
    }
    else if(currentSelectMenu === "ChatLog") {
        return (
            <ChatLog></ChatLog>
        )
    }
    else if(currentSelectMenu === "Management") {
        return (
            <Management></Management>
        )
    }
    else if(currentSelectMenu === "BoardDetail") {
        return (
            <TeamBoardDetail></TeamBoardDetail>
        )
    }
    else if(currentSelectMenu === "BoardWrite") {
        return (
            <TeamBoardWrite></TeamBoardWrite>
        )
    }
    else if(currentSelectMenu === "BoardModify") {
        return (
            <TeamBoardModify></TeamBoardModify>
        )
    }
}

export default TeamInfoContentsContainer;