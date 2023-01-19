//import react hooks
import { useState, useEffect } from "react";
//import functions
import functionGetTeamMemberList from "../../../Functions/FunctionTeam/functionGetTeamMemberList";
import functionExitMember from "../../../Functions/FunctionTeam/functionExitMember";
import functionApplyOkay from "../../../Functions/FunctionTeam/functionApplyOkay";
import functionApplyReject from "../../../Functions/FunctionTeam/functionApplyReject";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { Card } from "react-bootstrap";
//import css
import "../../../css/TeamPageCss/Management.css";


function Management() {
    //해당 팀에 대한 member 데이터를 갖고 있는 배열 useState 변수
    const [ teamMemberArray, setTeamMemberArray ] = useState([]);
    //해당 팀에 대한 신청 기록 데이터를 갖고 있는 배열 useState 변수
    const [ teamApplyArray, setTeamApplyArray ] = useState([]);
    //백엔드로부터 값을 받아오기 전에는 로딩 컴포넌트를 화면에 띄워주기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //팀 관리 컴포넌트 첫 렌더링 시 백엔드로부터 데이터들을 받기 위한 useEffect 함수
    useEffect(() => {
        functionGetTeamMemberList(window.sessionStorage.currentClickTeam, setTeamMemberArray, setLoadingStatus, setTeamApplyArray);
    }, []);

    //팀 관리에서 유저 강퇴 버튼 클릭 시 호출되는 이벤트 함수
    const handleClickExit = (e) => {
        functionExitMember(e.target.id, window.sessionStorage.currentClickTeam, setTeamMemberArray);
    }

    //유저가 신청한 기록에서 승인 버튼 클릭 시 호출되는 이벤트 함수
    const handleApplyOkay = (nickname) => {
        functionApplyOkay(nickname, setTeamMemberArray, setTeamApplyArray, window.sessionStorage.currentClickTeam);
    }
    //유저가 신청한 기록에서 거절 버튼 클릭 시 호출되는 이벤트 함수
    const handleApplyReject = (nickname) => {
        functionApplyReject(nickname, setTeamApplyArray, window.sessionStorage.currentClickTeam);
    }

    if(loadingStatus) {
        return (
            <div id="teaminfoAllContainer">
                <h4 id="teamMemberHeader">Member Management</h4>
                <div className="teamManagementContainer">
                    {teamMemberArray.map((member) => {
                        if(member[3] === "0") {
                            return (
                                <div className="cardContainer" key={member[0]}>
                                    <Card>
                                    <Card.Img variant="top" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" />
                                        <Card.Body>
                                            <Card.Title>{member[0]}</Card.Title>
                                            <Card.Text>
                                                <span className="userInfoText" style={{margin:"0"}}>{member[2]}</span>
                                                <span className="userInfoText" style={{margin:"0"}}>{member[1]}</span>
                                            </Card.Text>
                                            <button id={member[0]} className="outlineDanger" onClick={handleClickExit}>강퇴</button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        }
                    })}
                </div>
                <h4 id="teamAppliedHeader">Applied Management</h4>
                <div className="teamManagementContainer">
                        {teamApplyArray.map((applyMember) => (
                            <div className="cardContainer" key={applyMember[0]}>
                                <Card>
                                    <Card.Img variant="top" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" />
                                    <Card.Body>
                                        <Card.Title>{applyMember[0]}</Card.Title>
                                        <Card.Text>
                                            <span className="userInfoText">{applyMember[2]}</span>
                                            <span className="userInfoText">{applyMember[1]}</span>
                                        </Card.Text>
                                        <button className="outlinePrimary" onClick={() => handleApplyOkay(applyMember[0])}>승인</button>
                                        <button className="outlineDanger" onClick={() => handleApplyReject(applyMember[0])}>거절</button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </div>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id="teaminfoAllContainer" style={{textAlign:"center"}}>
                <Spinner animation="border" style={{marginTop:"300px"}}/>
            </div>
        )
    }
}

export default Management;