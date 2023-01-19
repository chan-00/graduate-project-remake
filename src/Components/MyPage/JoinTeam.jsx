//import react bootstrap icons
import { PersonCircle, EmojiFrown } from "react-bootstrap-icons";
//import react bootstrap
import { Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
//import css
import "../../css/MyPageCss/JoinTeam.css";
//import function
import functionUserTeamInfo from "../../Functions/FunctionMyPage/functionUserTeamInfo";
//import react hooks
import { useState } from "react";
//import react router
import { useNavigate } from "react-router-dom";

//마이페이지에서 현재 계정이 가입된 팀 여부를 보여주는 영역에 대한 컴포넌트
function JoinTeam({teamArray, teamInfo, setTeamInfo, loadingStatus}) {
    //화면 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //현재 클릭한 팀명 값을 담을 useState 변수
    const [ currentTeamName, setCurrentTeamName ] = useState("");

    //팀 리스트에서 특정 팀 클릭 시 발생하는 click 이벤트 함수
    const handleClickTeam = (e) => {
        functionUserTeamInfo(e.target.id, setTeamInfo);
        setCurrentTeamName(e.target.id);
    }

    const handleTeamClick = (teamname) => {
        window.sessionStorage.setItem("currentClickTeam", teamname);
        navigate("/teaminfo");
    }

    if(teamArray.length !== 0 && loadingStatus) {
        return (
            <div className="mypageTeamContainer"> 
                {/*   가입된 팀이 있을 때의 디자인  */}
                <ul className="mypageTeamList">
                    {teamArray.map((team) => {
                        return (
                            <li key={team[0]} id={team[0]} onClick={handleClickTeam}>{team[0]}<span key={team[0]}>{team[1]}/8</span></li>
                        )
                    })}
                </ul>
                <div className="mypageTeamMemberContainer">
                    {teamInfo.length !== 0 ? <h2>Team member</h2> : <h2 style={{marginTop:"150px"}}>Select Team</h2>}
                    <div className="mypageTeamMemberInfo">
                        {teamInfo.map((member) => {
                            return (
                                <div key={member[0]} id={member[0]}>
                                    <PersonCircle></PersonCircle>
                                    {member[1] === "1" ? <span style={{color:"royalblue"}}>{member[0]}</span> : <span>{member[0]}</span>}
                                </div>
                            )
                        })}
                    </div>
                    {currentTeamName !== "" ? <Button variant="outline-secondary" className="mypageTeamMemberFooter" onClick={() => handleTeamClick(currentTeamName)}>{currentTeamName} 페이지로 이동</Button> : null}
                </div>
            </div>
        )
    }
    else if(teamArray.length === 0 && loadingStatus) {
        return (
            <div className="mypageTeamContainer"> 
            {/*   가입된 팀이 없을 때의 디자인  */}
                <div id="mypageNoneTeamMessageContainer">
                    <EmojiFrown></EmojiFrown>
                    <p>가입되어 있는 팀이 없습니다......</p>
                </div>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div className="mypageTeamContainer"> 
            {/* 백엔드로부터 값을 받아오기 전 로딩 Spinner를 보여주기 위한 코드 */}
                <div id="mypageNoneTeamMessageContainer">
                    <Spinner animation="border" />
                </div>
            </div>
        )
    }
}

export default JoinTeam;