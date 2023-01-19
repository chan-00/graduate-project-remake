//import css
import "../../css/TeamPageCss/TeamDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react icons
import { PersonLinesFill, FolderSymlink, Chat, BarChartSteps } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState } from "react";
//import functions
import functionGetTeamBelong from "../../Functions/FunctionTeam/functionGetTeamBelong";
//import component
import TeamInfoContentsContainer from "./TeamInfoContents/TeamInfoContentsContainer";
import TeamInfo from "./TeamInfoContents/TeamInfo";


function TeamDetail() {
    //현재 팀 상세 페이지에 들어온 계정이 해당 팀에 속해 있는지, 속해 있다면 팀장인지에 대한 여부 값이 담길 useState 변수
    const [ teamBelong, setTeamBelong ] = useState("");
    //현재 사이드바 옆에 어떤 내용을 출력할지에 대한 내용이 담긴 useState 변수
    const [ selectedMenu, setSelectedMenu ] = useState("TeamInfo");
    //백엔드로부터 값을 받아오기 전에는 로딩 컴포넌트를 화면에 띄워주기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //팀 상세 페이지가 처음 렌더링 될 때 현재 페이지에 있는 계정의 아이디값과 어떤 팀의 페이지에 있는지에 대한 데이터를,
    //백엔드와 통신하는 함수의 매개변수로 넘겨주고 호출한다.
    useEffect(() => {
        //로그인 상태라면 로그인된 계정의 아이디값, 비로그인 상태라면 "not_login"이라는 특정 값을 백엔드에 요청한다.
        if(window.sessionStorage.id) {
            functionGetTeamBelong(window.sessionStorage.id, window.sessionStorage.currentClickTeam, setTeamBelong, setLoadingStatus);
        }
        else {
            functionGetTeamBelong("not_login", "JavaScript 스터디", setTeamBelong);
        }
    }, []);
    
    //팀 상세 페이지의 sidebar 메뉴 클릭 시 호출되는 이벤트 함수이다.
    const handleTeamSideBarMenuClick = (clickID) => {
        setSelectedMenu(clickID);
    }

    if((teamBelong === "0" || teamBelong === "1") && loadingStatus) {
        return (
            <div id="teamPageAllContainer">
                <div id="teamPageSideBar">
                    <div id="TeamInfo" className={selectedMenu === "TeamInfo" ? "selectedTeamSideBarMenu" : ""} onClick={() => handleTeamSideBarMenuClick("TeamInfo")}>
                        <PersonLinesFill></PersonLinesFill>
                        <span>Team Info</span> 
                    </div>
                    <div id="FileHistory" className={selectedMenu === "FileHistory" ? "selectedTeamSideBarMenu" : ""} onClick={() => handleTeamSideBarMenuClick("FileHistory")}>
                        <FolderSymlink></FolderSymlink>
                        <span>File History</span> 
                    </div>
                    <div id="ChatLog" className={selectedMenu === "ChatLog" ? "selectedTeamSideBarMenu" : ""} onClick={() => handleTeamSideBarMenuClick("ChatLog")}>
                        <Chat></Chat>
                        <span>Chat Log</span> 
                    </div>
                    {teamBelong === "1" ? 
                    <div id="Management" className={selectedMenu === "Management" ? "selectedTeamSideBarMenu" : ""} onClick={() => handleTeamSideBarMenuClick("Management")}>
                        <BarChartSteps></BarChartSteps>
                        <span>Management</span> 
                    </div> : 
                    null}
                </div>
                <TeamInfoContentsContainer currentSelectMenu={selectedMenu} teamBelong={teamBelong}></TeamInfoContentsContainer>
            </div>
        )
    }
    else if((teamBelong === "-1") && loadingStatus) {
        return (
            <div id="teamPageAllContainer" style={{paddingLeft:"120px"}}>
                <TeamInfo teamBelong={teamBelong}></TeamInfo>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id="teamPageAllContainer" style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
}

export default TeamDetail;