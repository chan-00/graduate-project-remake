//import css
import "../../css/TeamPageCss/TeamMake.css";
//import react bootstrap
import { Button, Modal } from "react-bootstrap";
//import react bootstrap icon
import { QuestionCircle } from "react-bootstrap-icons";
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
    const [ teamCategory, setTeamCategory ] = useState("IT");

    //팀 생성 Modal 창의 Boolean useState 변수
    const [ teamMakeHintModalShow, setTeamMakeHintModalShow ] = useState(false);

    //팀 생성 Modal 창을 켜고 끄는 함수이다.
    const handleTeamMakeHintModalShow = () => setTeamMakeHintModalShow(true);
    const handleTeamMakeHintModalClose = () => setTeamMakeHintModalShow(false);

    //로그인이 안되어 있을 때 로그인 페이지로 이동하게 하는 useEffect 함수
    useEffect(() => {
        if(!window.sessionStorage.id) {
            alert("로그인이 되어 있지 않습니다!");
            navigate("/signin");
        }
    }, []);

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
            <div id="pointQuestionContainer" onClick={() => handleTeamMakeHintModalShow()}>
                <QuestionCircle/>
                <span>팀 생성 도움말</span>
            </div>
            <div id="teammakeAllContainer">
                <div id="teammakeImageContainer">
                    <h3>Welcome!</h3><br />
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
            <Modal show={teamMakeHintModalShow} onHide={handleTeamMakeHintModalClose}>
                <Modal.Header closeButton>
                    <h4>팀 생성 도움말</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>팀명은 필수로 입력해야 하며 100글자 이상이 되면 안 됩니다.</p>
                    <p>팀명에 공백 또는 특수문자가 들어가면 안 됩니다.</p>
                    <p>팀 설명은 400자가 넘어가면 안 됩니다.</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TeamMake;