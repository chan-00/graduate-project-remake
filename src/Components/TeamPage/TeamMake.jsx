//import css
import "../../css/TeamPageCss/TeamMake.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react hooks
import { useEffect, useRef, useState } from "react";
//import Functions
import functionTeamMake from "../../Functions/FunctionTeam/functionTeamMake";
//import react router
import { useNavigate } from "react-router-dom";


function TeamMake() {
    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //팀 정보 입력 element와 연결된 ref 변수들
    const teamnameRef = useRef();
    const teamDescRef = useRef();
    //팀 카테고리 값이 담길 useState 변수
    const [ teamCategory, setTeamCategory ] = useState("국어");


    //팀 생성 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamMake = (e) => {
        e.preventDefault();
        functionTeamMake(window.sessionStorage.id, teamnameRef, teamDescRef, teamCategory, navigate);
    }
    //팀 카테고리 select box 값이 바뀔 때 호출되는 이벤트 함수
    const handleChangeCategory = (e) => {
        setTeamCategory(e.target.value);
    }

    return (
        <div id="teammakeBody">
            <div id="teammakeAllContainer">
                <div id="teammakeImageContainer">
                    <h3>Welcome!</h3>
                    <span>팀을 생성하고 언제 어디서나 자유롭게 스터디하세요</span>
                </div>
                <div id="teammakeContentsContainer">
                    <h3>Create Team</h3>
                    <hr></hr>
                    <form className="teamMakeContainer" onSubmit={handleTeamMake}>
                        <h4>Team Name</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="Input team name"
                                ref={teamnameRef}
                                maxLength="100"
                                autoFocus
                                required
                                className="formElements inputElements"
                            />
                        </div>
                        <h4>Description</h4>
                        <div>
                            <input
                                type="text"
                                placeholder="Description"
                                ref={teamDescRef}
                                maxLength="400"
                                className="formElements inputElements"
                            />
                        </div>
                        <h4>Select Category</h4>
                        <div>
                            <select onChange={handleChangeCategory}>
                                <option value="IT">IT</option>
                                <option value="문화">문화</option>
                                <option value="수학">수학</option>
                                <option value="과학">과학</option>
                                <option value="언어">언어</option>
                                <option value="경제">경제</option>
                                <option value="문학/창작">문학/창작</option>
                                <option value="사회">사회</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="makeButtonContainer">
                            <Button type="submit" variant="primary" className="formElements">팀 생성</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TeamMake;