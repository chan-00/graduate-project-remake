//import css
import "../../../css/TeamPageCss/TeamBoardDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState } from "react";
//import functions
import functionTeamBoardDetailInfo from "../../../Functions/FunctionTeam/functionTeamBoardDetailInfo";

function TeamBoardDetail({ setSelectedMenu }) {

    //팀 게시글 상세 정보들을 담을 배열 useState 변수
    const [ teamBoardInfo, setTeamBoardInfo ] = useState([]);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //팀 게시글 첫 렌더링 시 해당 게시글에 대한 정보를 받아 오기 위한 useEffect 함수
    useEffect(() => {
        functionTeamBoardDetailInfo(window.sessionStorage.currentClickTeamBoardID, setTeamBoardInfo, setLoadingStatus);
    }, []);

    //게시판 title 클릭 시 팀 게시판으로 돌아가게끔 하는 이벤트 함수
    const handleTeamBoard = () => {
        setSelectedMenu("TeamBoard");
    }

    //게시글 삭제 버튼 클릭 시 삭제 동작을 위한 이벤트 함수
    const handleTeamBoardDelete = () => {

    }

    if(loadingStatus) {
        return (
            <div id="teamBoardAllContainer">
                <div id="teamBoardContentsAllContainer">
                    <div id="boardTitleContainer">
                        <h4 onClick={handleTeamBoard}>{window.sessionStorage.currentClickTeam} 게시판</h4>
                        <hr></hr>
                        <div id="boardContentsTitleContainer">
                            <span>{teamBoardInfo[0]}</span>
                            {(teamBoardInfo[3] === window.sessionStorage.nickname && teamBoardInfo[4] !== "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlinePrimary">수정</button> 
                                    <button className="outlineDanger" onClick={handleTeamBoardDelete}>삭제</button>
                                </div>
                            : (teamBoardInfo[3] === window.sessionStorage.nickname && teamBoardInfo[4] === "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlineDanger" onClick={handleTeamBoardDelete}>삭제</button>
                                </div>
                        : null}
                        </div>
                        <div id="boardAdditionInfoContainer">
                            <span>{boardInfo[1]}</span>
                            <span>{boardInfo[6]}</span>
                        </div>
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