//import css
import "../../../css/TeamPageCss/TeamBoardDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState } from "react";
//import functions
import functionTeamBoardDetailInfo from "../../../Functions/FunctionTeam/functionTeamBoardDetailInfo";
import functionTeamBoardDelete from "../../../Functions/FunctionTeam/functionTeamBoardDelete";

function TeamBoardDetail({ setSelectedMenu }) {

    //팀 게시글 상세 정보들을 담을 배열 useState 변수
    const [ teamBoardInfo, setTeamBoardInfo ] = useState([]);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //자료 공유 게시글일 경우 해당 자료에 대한 정보를 나눠 담을 배열
    const [ shareInfo, setShareInfo ] = useState([]);

    //팀 게시글 첫 렌더링 시 해당 게시글에 대한 정보를 받아 오기 위한 useEffect 함수
    useEffect(() => {
        functionTeamBoardDetailInfo(window.sessionStorage.currentClickTeamBoardID, setTeamBoardInfo, setLoadingStatus);
    }, []);
    //백엔드로부터 게시글 정보를 받아왔을 때 자료 공유 게시물일 경우 데이터를 변수에 나눠 저장하기 위한 useEffect 함수
    useEffect(() => {
        if(teamBoardInfo[4] === "share") {
            const tempShareInfo = teamBoardInfo[1].split("(게시글구분문자열)");
            setShareInfo(tempShareInfo);
        }
    }, [teamBoardInfo]);

    //게시판 title 클릭 시 팀 게시판으로 돌아가게끔 하는 이벤트 함수
    const handleTeamBoard = () => {
        setSelectedMenu("TeamBoard");
    }

    //게시글 삭제 버튼 클릭 시 삭제 동작을 위한 이벤트 함수
    const handleTeamBoardDelete = () => {
        functionTeamBoardDelete(window.sessionStorage.currentClickTeamBoardID, handleTeamBoard);
    }

    //자료 공유 게시글일 경우 자료 공유 영역 클릭 시 호출되는 이벤트 함수
    const handleShareInfoClick = () => {
        window.open(shareInfo[1]);
    }

    if(loadingStatus) {
        return (
            <div id="teamBoardAllContainer">
                <div id="teamBoardInfoContentsAllContainer">
                    <div id="boardTitleContainer">
                        <h4 onClick={handleTeamBoard}>{window.sessionStorage.currentClickTeam} 게시판</h4>
                        <hr></hr>
                        <div id="boardContentsTitleContainer">
                            <span>{teamBoardInfo[0]}</span>
                            {(teamBoardInfo[3] === window.sessionStorage.nickname && teamBoardInfo[4] !== "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlinePrimary" onClick={() => setSelectedMenu("BoardModify")}>수정</button> 
                                    <button className="outlineDanger" onClick={handleTeamBoardDelete}>삭제</button>
                                </div>
                            : (teamBoardInfo[3] === window.sessionStorage.nickname && teamBoardInfo[4] === "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlineDanger" onClick={handleTeamBoardDelete}>삭제</button>
                                </div>
                        : null}
                        </div>
                        <div id="boardAdditionInfoContainer">
                            <span>{teamBoardInfo[3]}</span>
                            <span>{teamBoardInfo[2]}</span>
                        </div>
                        <hr></hr>
                    </div>
                    <div id="boardContentsContainer">
                        {teamBoardInfo[4] !== "share" ? 
                            <pre>{teamBoardInfo[1]}</pre>
                        :
                            <div id="shareInfoContainer" onClick={handleShareInfoClick}>
                                <h4>{shareInfo[0]}</h4>
                                <p>{shareInfo[2]}</p>
                            </div>
                        }
                        <hr></hr>
                    </div>
                </div>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id="teamMainAllContainer" style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
}

export default TeamBoardDetail;