//import css
import "../../css/MyPageCss/MyPage.css";
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button, Modal } from "react-bootstrap";
//import react hooks
import { useEffect, useState, useRef } from "react";
//import components
import JoinTeam from "./JoinTeam";
//import react router
import { useNavigate } from "react-router-dom";
//import functions
import functionUserInfo from "../../Functions/FunctionMyPage/functionUserInfo";
import functionPwdModify from "../../Functions/FunctionModify/functionPwdModify";
import functionNicknameModify from "../../Functions/FunctionModify/functionNicknameModify";
import functionEmailModify from "../../Functions/FunctionModify/functionEmailModify";
import functionCommentsModify from "../../Functions/FunctionModify/functionCommentsModify";
import functionProfileImageModify from "../../Functions/FunctionModify/functionProfileImageModify";
//import atom
import { useRecoilState } from "recoil";
import atomNickname from "../../Atoms/atomNickname";


//마이페이지 영역 컴포넌트
function MyPage() {
    //이미지 수정을 위한 변수 선언
    let uploadFile;
    let formData;

    //페이지 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //닉네임 atom 값을 가져와 mypage의 profile 부분에 닉네임을 표시해주기 위한 useRecoilState 값
    const [ nickname, setNickname ] = useRecoilState(atomNickname);

    /* Modal Boolean useState */
    //password edit 버튼 클릭 시 비밀번호 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ passwordModifyModalShow, setPasswordModifyModalShow ] = useState(false);
    //nickname edit 버튼 클릭 시 닉네임 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ nicknameModifyModalShow, setNicknameModifyModalShow ] = useState(false);
    //email edit 버튼 클릭 시 닉네임 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ emailModifyModalShow, setEmailModifyModalShow ] = useState(false);
    //Comments edit 버튼 클릭 시 코멘트 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ commentsModifyModalShow, setCommentsModifyModalShow ] = useState(false);
    //프로필 클릭 시 프로필 사진 수정을 할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ profileImageModifyModalShow, setProfileImageModifyModalShow ] = useState(false);
    /* Modal Boolean useState */

    /* modify value useState */
    //user comments 값을 담고 있을 useState 변수
    const [ userComments, setUserComments ] = useState("");
    //user email 값을 담고 있을 useState 변수
    const [ userEmail, setUserEmail ] = useState("");
    //마이페이지의 해당 유저가 속한 팀에 대한 정보를 담는 배열 useState 변수
    const [ userTeamArray, setUserTeamArray ] = useState([]);
    //마이페이지에서 팀의 상세 정보를 나타낼 정보를 담는 배열 useState 변수
    const [ userTeamInfoArray, setUserTeamInfoArray ] = useState([]);
    //마이페이지 첫 렌더링 시 팀 리스트를 받아오기 전까지 로딩 창을 띄우기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //이미지 base64 값 테스트 useState
    const [ profileImage, setProfileImage ] = useState("");
    //해당 계정이 작성한 게시글 개수와 댓글 개수를 표시해 주는 데이터를 담을 useState 변수
    
    /* modify value useState */

    //기존 비밀번호 입력 input에 대한 useRef 변수
    const pwRef = useRef();
    //새로운 비밀번호 입력 input에 대한 useRef 변수
    const newPwRef = useRef();
    //새로운 닉네임 입력 input에 대한 useRef 변수
    const newNicknameRef = useRef();
    //새로운 이메일 입력 input에 대한 useRef 변수
    const newEmailRef = useRef();
    //새로운 코멘트 입력 input에 대한 useRef 변수
    const newCommentsRef = useRef();

    //마이페이지 첫 렌더링 시 body 태그의 background color를 변경하기 위한 useEffect 작업
    useEffect(() => {
        if(window.sessionStorage.id) {
            document.body.style.backgroundColor = "#f8f8fa";
            functionUserInfo(window.sessionStorage.id, setUserEmail, setUserComments, setUserTeamArray, setLoadingStatus, setProfileImage);
        }
        else {
            alert("로그인 되어 있지 않습니다!");
            navigate("/signin");
        }
        return () => {
            document.body.style.backgroundColor = "#ffffff";
        }
    }, []);

    /* Modal on/off event function */
    //password edit Modal 창을 켜고 끄는 함수이다.
    const handlePasswordModifyModalShow = () => setPasswordModifyModalShow(true);
    const handlePasswordModifyModalClose = () => setPasswordModifyModalShow(false);
    //nickname edit Modal 창을 켜고 끄는 함수이다.
    const handleNicknameModifyModalShow = () => setNicknameModifyModalShow(true);
    const handleNicknameModifyModalClose = () => setNicknameModifyModalShow(false);
    //email edit Modal 창을 켜고 끄는 함수이다.
    const handleEmailModifyModalShow = () => setEmailModifyModalShow(true);
    const handleEmailModifyModalClose = () => setEmailModifyModalShow(false);
    //comments edit Modal 창을 켜고 끄는 함수이다.
    const handleCommentsModifyModalShow = () => setCommentsModifyModalShow(true);
    const handleCommentsModifyModalClose = () => setCommentsModifyModalShow(false);
    //profile image edit Modal 창을 켜고 끄는 함수이다.
    const handleProfileImageModifyModalShow = () => setProfileImageModifyModalShow(true);
    const handleProfileImageModifyModalClose = () => setProfileImageModifyModalShow(false);
    /* Modal on/off event function */

    /* Modal Click event function */
    //비밀번호 수정 Modal창에서 수정 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handlePasswordModify = (e) => {
        e.preventDefault();
        functionPwdModify(window.sessionStorage.id, pwRef, newPwRef, handlePasswordModifyModalClose);
    }
    //닉네임 수정 Modal창에서 수정 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleNicknameModify = (e) => {
        e.preventDefault();
        functionNicknameModify(window.sessionStorage.id, newNicknameRef, handleNicknameModifyModalClose, setNickname);
    }
    //이메일 수정 Modal창에서 수정 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleEmailModify = (e) => {
        e.preventDefault();
        functionEmailModify(window.sessionStorage.id, newEmailRef, handleEmailModifyModalClose, setUserEmail);
    }
    //코멘트 수정 Modal창에서 수정 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleCommentsModify = (e) => {
        e.preventDefault();
        functionCommentsModify(window.sessionStorage.id, newCommentsRef, handleCommentsModifyModalClose, setUserComments);
    }
    //프로필 사진 수정 Modal창에서 수정 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleProfileImageModify = (e) => {
        e.preventDefault();

        if(formData) {
            functionProfileImageModify(formData, setProfileImage, handleProfileImageModifyModalClose);
        }
    }
    /* Modal Click event function */

    /* 이미지 수정 이벤트 함수 */
    const onChangeImg = (e) => {
        e.preventDefault();
        
        if(e.target.files){
            uploadFile = e.target.files[0];
            formData = new FormData();
            formData.append('files',uploadFile);
            formData.append('id', window.sessionStorage.id);
        }
    }
    /* 이미지 전송 테스트 코드 */

    return (
        <div className="mypageAllContainer">
            <div className="mypageContentsAllContainer">
                <div className="mypageProfileAllContainer mypageContentsContainer">
                    <div className="mypageProfileContainer">
                        {profileImage.length !== 0 ? <img src={`data:image/png;base64,${profileImage}`} onClick={handleProfileImageModifyModalShow} /> : null}
                        <span>{window.sessionStorage.nickname}</span>
                        <span id="userEmailText">{userEmail}</span>
                        <button onClick={handleEmailModifyModalShow}>email Edit</button>
                        <button onClick={handleNicknameModifyModalShow}>Nickname Edit</button>
                        <button onClick={handlePasswordModifyModalShow}>Password Edit</button>
                        <div id="userCommentsContainer">
                            {userComments}
                            <button onClick={handleCommentsModifyModalShow}>Edit</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="mypageUserContentsListContainer">
                        <div><p>{userTeamArray.length}</p><span>Join Team</span></div>
                        <div><p>810</p><span>Write Post</span></div>
                        <div><p>270</p><span>Write Comments</span></div>
                    </div>
                </div>
                <div className="mypageTeamAllContainer mypageContentsContainer">
                    <div className="mypageNavContainer">
                        <button className='mypageNavBtnActive'>Joined Team</button>
                    </div>
                    <hr></hr>
                    <div className="mypageTeamContentsContainer">
                        <JoinTeam teamArray={userTeamArray} teamInfo={userTeamInfoArray} setTeamInfo={setUserTeamInfoArray} loadingStatus={loadingStatus}></JoinTeam>
                    </div>
                </div>
            </div>
            <Modal 
                show={passwordModifyModalShow} 
                onHide={handlePasswordModifyModalClose}
                >
                <Modal.Header closeButton>
                    <h4>Password Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handlePasswordModify}>
                        <div>
                            <input
                                type="password"
                                placeholder="기존 비밀번호 입력"
                                ref={pwRef}
                                maxLength="20"
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginBottom:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="새로운 비밀번호 입력"
                                ref={newPwRef}
                                maxLength="20"
                                required
                                className="formElements inputElements"
                                style={{borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>비밀번호 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handlePasswordModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={nicknameModifyModalShow} onHide={handleNicknameModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Nickname Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleNicknameModify}>
                        <div>
                            <input
                                type="text"
                                placeholder="새로운 닉네임 입력"
                                ref={newNicknameRef}
                                maxLength="20"
                                defaultValue={nickname}
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginBottom:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>닉네임 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleNicknameModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={emailModifyModalShow} onHide={handleEmailModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Email Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleEmailModify}>
                        <div>
                            <input
                                type="email"
                                placeholder="변경할 이메일 입력"
                                ref={newEmailRef}
                                maxLength="30"
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginBottom:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>이메일 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleEmailModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={commentsModifyModalShow} onHide={handleCommentsModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Comment Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleCommentsModify}>
                        <div>
                            <input
                                type="text"
                                placeholder="변경할 코멘트 입력"
                                ref={newCommentsRef}
                                maxLength="400"
                                defaultValue={userComments}
                                spellCheck="false"
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginBottom:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>코멘트 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleCommentsModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={profileImageModifyModalShow} onHide={handleProfileImageModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Profile Image Change</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleProfileImageModify}>
                        <div>
                            <label htmlFor="profile-upload" />
                            <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>프로필 사진 수정</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleProfileImageModifyModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MyPage;