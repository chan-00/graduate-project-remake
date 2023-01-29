//import css
import "../../../css/TeamPageCss/TeamInfo.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { Button, Modal, Card } from "react-bootstrap";
//import react icons
import { PencilSquare } from "react-bootstrap-icons";
//import functions
import functionGetTeamInfo from "../../../Functions/FunctionTeam/functionGetTeamInfo";
import functionTeamCommentModify from "../../../Functions/FunctionTeam/functionTeamCommentModify";
import functionTeamApply from "../../../Functions/FunctionTeam/functionTeamApply";
//import react hooks
import { useEffect, useState, useRef } from "react";


function TeamInfo({ teamBelong }) {
    //코멘트 수정 값과 연결된 useRef 변수
    const newCommentRef = useRef();

    //백엔드로부터 받아올 팀 정보들을 담을 배열 useState 변수
    const [ teaminfoArray, setTeamInfoArray ] = useState([]);
    //백엔드로부터 값을 받아오기 전에는 로딩 컴포넌트를 화면에 띄워주기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //코멘트 값을 갖고 있는 useState 변수(코멘트 수정 시 화면에 바뀐 코멘트가 나오게 하기 위해서 useState로 관리)
    const [ teamComment, setTeamComment ] = useState("");
    //comment edit 버튼 클릭 시 코멘트 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ teamCommentModifyModalShow, setTeamCommentModifyModalShow ] = useState(false);
    //해당 팀에 대한 member 데이터를 갖고 있는 배열 useState 변수
    const [ teamMemberArray, setTeamMemberArray ] = useState([]);
    //팀에 속한 팀원들의 프로필 사진 base64 값을 담을 배열 useState 변수
    const [ userProfileInfo, setUserProfileInfo ] = useState([]);

    //첫 렌더링 시 팀 정보를 표시하기 위한 useEffect 함수
    useEffect(() => {
        functionGetTeamInfo(window.sessionStorage.currentClickTeam, setTeamInfoArray, setLoadingStatus, setTeamComment, setTeamMemberArray, setUserProfileInfo);
    }, []);

    //comment edit Modal 창을 켜고 끄는 함수이다.
    const handleTeamCommentModifyModalShow = () => setTeamCommentModifyModalShow(true);
    const handleTeamCommentModifyModalClose = () => setTeamCommentModifyModalShow(false);

    //코멘트 수정 submit 이벤트 함수
    const handleCommentModify = (e) => {
        e.preventDefault();
        functionTeamCommentModify(newCommentRef, window.sessionStorage.currentClickTeam, setTeamComment, handleTeamCommentModifyModalClose);
    }

    //팀원이 아닌 계정이 해당 팀에 신청 버튼을 클릭했을 때 호출되는 이벤트 함수
    const handleApplyButtonClick = () => {
        functionTeamApply(window.sessionStorage.id, window.sessionStorage.currentClickTeam);
    }

    if(loadingStatus) {
        return (
            <div id="teaminfoAllContainer">
                <div id="teaminfoContainer">
                    <h4>{window.sessionStorage.currentClickTeam}{teamBelong === "-1" ? <button className="outlinePrimary" onClick={handleApplyButtonClick}>신청</button> : null}</h4>
                    <span>Category : {teaminfoArray[2]}</span>
                    <span>Start Date : {teaminfoArray[1]}</span>
                    <hr></hr>
                    <div id="teamCommentContainer">
                        <span>{teamComment}</span>
                        {teamBelong === "1" ? <PencilSquare title="edit button" onClick={handleTeamCommentModifyModalShow}></PencilSquare> : null}
                    </div>
                </div>
                <div className="teamManagementContainer">
                    {teamMemberArray.map((member, index) => (
                        <div className="cardContainer" key={member[0]}>
                            <Card>
                                <img src={`data:image/png;base64,${userProfileInfo[index]}`} />
                                <Card.Body>
                                    <Card.Title className={member[3] === "1" ? "leaderMemberColor" : null}>{member[0]}</Card.Title>
                                    <Card.Text>
                                        <span className="userInfoText">{member[2]}</span>
                                        <span className="userInfoText">{member[1]}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                <Modal show={teamCommentModifyModalShow} onHide={handleTeamCommentModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Comment Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleCommentModify}>
                        <div>
                            <input
                                type="text"
                                placeholder="코멘트 수정"
                                ref={newCommentRef}
                                maxLength="400"
                                defaultValue={teamComment}
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginBottom:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>코멘트 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleTeamCommentModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
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

export default TeamInfo;