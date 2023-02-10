//import css
import "../../../css/TeamPageCss/TeamBoardDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react bootstrap icons
import { Download } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState, useRef } from "react";
//import functions
import functionTeamBoardDetailInfo from "../../../Functions/FunctionTeam/functionTeamBoardDetailInfo";
import functionTeamBoardDelete from "../../../Functions/FunctionTeam/functionTeamBoardDelete";
import functionTeamBoardFileDownload from "../../../Functions/FunctionTeam/functionTeamBoardFileDownload";
//import atom
import { useSetRecoilState } from "recoil";
import atomTeamSelectedMenu from "../../../Atoms/atomTeamSelectedMenu"

function TeamBoardDetail() {
    //blob 객체를 받을 시 a 링크 클릭을 담당하는 useRef
    const downloadElementRef = useRef();

    //현재 선택된 메뉴에 대한 값을 갖고 있는 recoil set 함수
    const setSelectedMenu = useSetRecoilState(atomTeamSelectedMenu);

    //팀 게시글 상세 정보들을 담을 배열 useState 변수
    const [ teamBoardInfo, setTeamBoardInfo ] = useState([]);
    //파일 정보가 있을 때 파일 정보를 담을 useState 변수
    const [ shareFileName, setShareFileName ] = useState("");
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //자료 공유 게시글일 경우 해당 자료에 대한 정보를 나눠 담을 배열
    const [ shareInfo, setShareInfo ] = useState([]);
    //blob 객체의 다운로드 url 값을 저장할 useState 변수
    const [ downloadUrl, setDownloadUrl ] = useState("");

    //팀 게시글 첫 렌더링 시 해당 게시글에 대한 정보를 받아 오기 위한 useEffect 함수
    useEffect(() => {
        functionTeamBoardDetailInfo(window.sessionStorage.currentClickTeamBoardID, setTeamBoardInfo, setLoadingStatus, setShareFileName);
    }, []);
    //백엔드로부터 게시글 정보를 받아왔을 때 자료 공유 게시물일 경우 데이터를 변수에 나눠 저장하기 위한 useEffect 함수
    useEffect(() => {
        if(teamBoardInfo[4] === "share") {
            const tempShareInfo = teamBoardInfo[1].split("(게시글구분문자열)");
            setShareInfo(tempShareInfo);
        }
    }, [teamBoardInfo]);
    //백엔드로부터 파일 객체를 받을 시 다운받는 경로가 생기는데, 이 때 화면상에는 보이지 않는 a 태그의 클릭 이벤트를 호출하여 파일을 다운받도록 한다.
    useEffect(() => {
        if(downloadUrl.length !== 0) {
            downloadElementRef.current.click();
        }
    }, [downloadUrl]);

    //뒤로가기 이벤트 발생 시 팀 게시판으로 돌아가게 하는 함수
    window.onpopstate = () => {
        setSelectedMenu("TeamBoard");
    }
    
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

    //파일 공유 게시글일 경우 첨부 파일 다운로드 클릭 시 호출되는 이벤트 함수
    const handleClickFileDownload = () => {
        functionTeamBoardFileDownload(window.sessionStorage.currentClickTeamBoardID, setDownloadUrl, downloadUrl);
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
                            {teamBoardInfo[4] === "file_save" ? 
                                <div>
                                    <span onClick={handleClickFileDownload} style={{border:"none"}}><Download></Download> 첨부 파일 : {shareFileName}</span>
                                    <a style={{visibility:"hidden"}} ref={downloadElementRef} href={downloadUrl.length !== 0 ? downloadUrl : null} download={shareFileName}></a>
                                </div>
                            : null}
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