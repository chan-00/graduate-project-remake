//import css
import "../../css/MyPageCss/MyPage.css";
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button, Modal } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
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
import functionGetMyBoardList from "../../Functions/FunctionMyPage/functionGetMyBoardList";
import functionGetMyBoardCommentList from "../../Functions/FunctionMyPage/functionGetMyBoardCommentList";
import functionWithDrawal from "../../Functions/FunctionModify/functionWithDrawal";
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
    //게시글 개수를 표시하는 영역 클릭 시 내가 작성한 게시글들을 볼 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ boardListModalShow, setBoardListModifyModalShow ] = useState(false);
    //댓글 개수를 표시하는 영역 클릭 시 내가 작성한 댓글들을 볼 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ boardCommentListModalShow, setBoardCommentListModifyModalShow ] = useState(false);
    //회원 탈퇴 클릭 시 정말 회원 탈퇴를 할 것인지 물어보는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ withDrawalModalShow, setWithDrawalModifyModalShow ] = useState(false);
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
    const [ countData, setCountData ] = useState([]);
    //해당 계정이 작성한 게시글 리스트를 받아 저장할 useState 변수
    const [ userBoardList, setUserBoardList ] = useState([]);
    //해당 계정이 작성한 댓글 리스트를 받아 저장할 useState 변수
    const [ userBoardCommentList, setUserBoardCommentList ] = useState([]);
    //해당 계정의 포인트 값을 저장할 변수
    const [ userPoint, setUserPoint ] = useState("");
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
            functionUserInfo(window.sessionStorage.id, setUserEmail, setUserComments, setUserTeamArray, setLoadingStatus, setProfileImage, setCountData, setUserPoint);
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
    //Board Modal 창을 켜고 끄는 함수이다.
    const handleBoardListModifyModalShow = () => setBoardListModifyModalShow(true);
    const handleBoardListModifyModalClose = () => setBoardListModifyModalShow(false);
    //Board Comment Modal 창을 켜고 끄는 함수이다.
    const handleBoardCommentListModifyModalShow = () => setBoardCommentListModifyModalShow(true);
    const handleBoardCommentListModifyModalClose = () => setBoardCommentListModifyModalShow(false);
    //widhDrawal Modal 창을 켜고 끄는 함수이다.
    const handleWidhDrawalModifyModalShow = () => setWithDrawalModifyModalShow(true);
    const handleWidhDrawalModifyModalClose = () => setWithDrawalModifyModalShow(false);
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
        else {
            alert("변경할 이미지를 선택해 주세요.");
        }
    }
    /* Modal Click event function */

    /* 이미지 수정 이벤트 함수 */
    const onChangeImg = (e) => {
        e.preventDefault();
        
        if(e.target.files){
            const fileType = e.target.files[0].type.split("/");

            if(fileType[0] === "image") {
                uploadFile = e.target.files[0];
                formData = new FormData();
                formData.append('files',uploadFile);
                formData.append('id', window.sessionStorage.id);
            }
            else {
                alert("이미지만 선택 가능합니다.");
            }
        }
    }
    /* 이미지 전송 테스트 코드 */

    //게시글 개수 영역 클릭 시 해당 계정이 작성한 게시글 목록을 보여 주도록 하는 이벤트 함수이다.
    const handleBoardListClick = () => {
        if(countData[0] !== 0) {
            functionGetMyBoardList(window.sessionStorage.id, handleBoardListModifyModalShow, setUserBoardList);
        }
        else if(countData[0] === 0) {
            alert("작성한 게시글이 없습니다.");
        }
    }
    //댓글 개수 영역 클릭 시 해당 계정이 작성한 게시글 목록을 보여 주도록 하는 이벤트 함수이다.
    const handleCommentListClick = () => {
        if(countData[1] !== 0) {
            functionGetMyBoardCommentList(window.sessionStorage.id, handleBoardCommentListModifyModalShow, setUserBoardCommentList);
        }
        else if(countData[1] === 0) {
            alert("작성한 댓글이 없습니다.");
        }
    }

    //본인이 작성한 게시글 리스트 중 특정 게시글 클릭 시 해당 게시글로 화면 이동하기 위한 이벤트 함수
    const handleUserBoardClick = (e) => {
        //클래스 이름을 space 값으로 split하여 나누면 첫 번째 인덱스의 값이 카테고리가 되도록 설정하였다.
        const targetClassInfo = e.target.className.split("list-group-item");

        //카테고리 값에 따라 공용 게시판으로 화면 이동시킬 것인지, 팀 게시판으로 화면 이동시킬 것인지 조건문으로 분류한다.
        if(targetClassInfo[0] === "Team " || targetClassInfo[0] === "Question " || targetClassInfo[0] === "Share ") {
            if(targetClassInfo[0] === "Team ") {
                window.sessionStorage.setItem("category", "Team");
            }
            else if(targetClassInfo[0] === "Question ") {
                window.sessionStorage.setItem("category", "Question");
            }
            else if(targetClassInfo[0] === "Share ") {
                window.sessionStorage.setItem("category", "Share");
            }
            window.sessionStorage.setItem("currentClickBoardID", e.target.id);
            navigate("/boarddetail");
        }
        else {
            window.sessionStorage.setItem("currentClickTeam", targetClassInfo[0]);
            window.sessionStorage.setItem("currentClickTeamBoardID", e.target.id);
            window.sessionStorage.setItem("teamSelectMenuValue", "BoardDetail");
            navigate("/teaminfo");
        }
    }
    //본인이 작성한 댓글 리스트 중 특정 댓글 클릭 시 해당 게시글로 화면 이동하기 위한 이벤트 함수
    const handleUserBoardCommentClick = (e) => {
        //클래스 이름을 space 값으로 split하여 나누면 첫 번째 인덱스의 값이 카테고리가 되도록 설정하였다.
        const targetClassInfo = e.target.className.split("list-group-item");

        //카테고리 값에 따라 게시판 종류 값을 세션 저장소에 나눠 저장하기 위해 조건문으로 분류하였다.
        if(targetClassInfo[0] === "Team ") {
            window.sessionStorage.setItem("category", "Team");
        }
        else if(targetClassInfo[0] === "Question ") {
            window.sessionStorage.setItem("category", "Question");
        }
        else if(targetClassInfo[0] === "Share ") {
            window.sessionStorage.setItem("category", "Share");
        }
        window.sessionStorage.setItem("currentClickBoardID", e.target.id);
        navigate("/boarddetail");
    }

    //회원탈퇴 Modal 창에서 "예" 버튼 클릭 시 호출되는 이벤트 함수
    const handleWithDrawal = () => {
        functionWithDrawal(window.sessionStorage.id, navigate, setNickname, handleWidhDrawalModifyModalClose);
    }

    return (
        <div className="mypageAllContainer">
            <div className="mypageContentsAllContainer">
                <div className="mypageProfileAllContainer mypageContentsContainer">
                    <div className="mypageProfileContainer">
                        {profileImage.length !== 0 ? <img src={`data:image/png;base64,${profileImage}`} onClick={handleProfileImageModifyModalShow} /> : null}
                        <span>{window.sessionStorage.nickname}</span>
                        <span id="userEmailText">{userEmail}</span>
                        <span id="withDrawalButton" onClick={handleWidhDrawalModifyModalShow}>회원 탈퇴</span>
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
                        <div><p onClick={handleBoardListClick}>{countData[0]}</p><span>Write Post</span></div>
                        <div><p onClick={handleCommentListClick}>{countData[1]}</p><span>Write Comments</span></div>
                        <div><p>{userPoint}</p><span>Point</span></div>
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
            <Modal show={boardListModalShow} onHide={handleBoardListModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Board List</h4>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup id="userBoardListGroup">
                        {userBoardList.map((board, index) => {
                            //어떤 게시판에 작성했는지에 따라 리스트에 표시해 줄 텍스트를 조건문으로 나눠서 다르게 구성한다.
                            let listContents;
                            if(board[2] === "Team") {
                                listContents = `${board[1]} (팀 구인 게시판)`;
                            }
                            else if(board[2] === "Question") {
                                listContents = `${board[1]} (질문 게시판)`;
                            }
                            else if(board[2] === "Share") {
                                listContents = `${board[1]} (정보 공유 게시판)`;
                            }
                            else {
                                listContents = `${board[1]} (${board[2]} 팀게시판)`;
                            }

                            return (
                                <ListGroup.Item key={index} id={board[0]} className={board[2]} onClick={handleUserBoardClick}>{listContents}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Modal.Body>
            </Modal>
            <Modal show={boardCommentListModalShow} onHide={handleBoardCommentListModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>Board Comment List</h4>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup id="userBoardListGroup">
                        {userBoardCommentList.map((boardComment, index) => {
                            const listContents = `${boardComment[2]} (${boardComment[1]})`;

                            return (
                                <ListGroup.Item key={index} id={boardComment[0]} className={boardComment[4]} onClick={handleUserBoardCommentClick}>{listContents}</ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Modal.Body>
            </Modal>
            <Modal show={withDrawalModalShow} onHide={handleWidhDrawalModifyModalClose}>
                <Modal.Header closeButton>
                    <h4>정말 회원 탈퇴하실 겁니까?</h4>
                </Modal.Header>
                <Modal.Body>
                        <div id="withDrawalButtonContainer" style={{marginTop:"20px"}}>
                            <Button variant="outline-danger" className="modifyButtons" onClick={handleWithDrawal}>예</Button>
                            <Button variant="outline-primary" className="modifyButtons" onClick={handleWidhDrawalModifyModalClose}>아니오</Button>
                        </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MyPage;