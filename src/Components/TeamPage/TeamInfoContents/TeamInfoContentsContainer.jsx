//import components
import TeamInfo from "./TeamInfo"
import TeamBoard from "./TeamBoard"
import ChatLog from "./ChatLog"
import Management from "./Management"
import TeamBoardDetail from "./TeamBoardDetail"
import TeamBoardWrite from "./TeamBoardWrite"


function TeamInfoContentsContainer({ currentSelectMenu, teamBelong, setSelectedMenu }) {
    if(currentSelectMenu === "TeamInfo") {
        return (
            <TeamInfo teamBelong={teamBelong}></TeamInfo>
        )
    }
    else if(currentSelectMenu === "TeamBoard") {
        return (
            <TeamBoard setSelectedMenu={setSelectedMenu}></TeamBoard>
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
            <TeamBoardDetail setSelectedMenu={setSelectedMenu}></TeamBoardDetail>
        )
    }
    else if(currentSelectMenu === "BoardWrite") {
        return (
            <TeamBoardWrite setSelectedMenu={setSelectedMenu}></TeamBoardWrite>
        )
    }
}

export default TeamInfoContentsContainer;