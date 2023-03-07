//import react bootstrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Header css
import "../../css/MainPageCss/Header.css"
//import react router
import { useNavigate } from 'react-router-dom';
//import react hooks
import { useState } from 'react';
//import atom
import { useRecoilState } from "recoil";
import atomNickname from "../../Atoms/atomNickname";
//import functions
import functionGetReadMessageNumber from '../../Functions/FunctionMyPage/functionGetReadMessageNumber';

//페이지 Header 영역을 bootstrap의 Navbar 활용하여 표현
function Header() {
    const navigate = useNavigate();

    //닉네임 atom 값을 가져와 Navbar의 닉네임 버튼에 적용시키기 위한 useRecoilState 값
    const [ nickname, setNickname ] = useRecoilState(atomNickname);

    //팀 페이지 메뉴 클릭 시 Modal 창을 띄우게 하기 위한 State 상태 관리값
    const [sessionShow, setSessionShow] = useState(false);
    //사용자가 읽지 않은 메시지가 몇 개인지에 대한 숫자 값을 담는 useState 변수
    const [ notReadMessage, setNotReadMessage ] = useState('0');
    //백엔드와 통신 시 렌더링을 늦게 표시하게 하기 위한 loading 값 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //Modal 창 활성/비활성화를 위한 State 값의 변경 함수
    const handleSessionShow = () => setSessionShow(true);
    const handleSessionClose = () => setSessionShow(false);

    //각각 로그인/회원가입 버튼을 눌렀을 때 호출되는 이벤트 함수로, 로그인과 회원가입 창으로 넘어가게끔 한다.
    const handleLoginShow = () => {
        navigate("/signin");
    }
    const handleSignUpShow = () => {
        navigate("/signup");
    }

    //Navbar에서 팀 페이지 메뉴를 클릭했을 떄 로그인 여부를 따져 로그인을 하지 않았으면 로그인 페이지로, 로그인을 했으면 팀 페이지로 이동하게끔 한다.
    //로그인 여부는 session의 id 값이 존재하는지의 여부를 파악한다.
    const handleTeamPageClick = () => {
        if(window.sessionStorage.id) {
            navigate("/team");
        }
        else {
            handleSessionShow();
        }
    }
    //Navbar에서 팀 생성 메뉴를 클릭했을 떄 로그인 여부를 따져 로그인을 하지 않았으면 로그인 페이지로, 로그인을 했으면 팀 페이지로 이동하게끔 한다.
    //로그인 여부는 session의 id 값이 존재하는지의 여부를 파악한다.
    const handleTeamMakePageClick = () => {
        if(window.sessionStorage.id) {
            navigate("/teammake");
        }
        else {
            handleSessionShow();
        }
    }

    //팀 페이지 메뉴 클릭 시 로그인이 되어 있지 않을 때 나오는 Modal 창의 로그인 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleTeamLoginShow = () => {
        handleSessionClose();
        handleLoginShow();
    }

    //유저 드롭다운 메뉴에서 로그아웃 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleLogout = () => {
        window.sessionStorage.clear();
        setNickname("");
        alert("로그아웃 되었습니다!");
        navigate("/");
    }

    //My Page 버튼 클릭 시 마이페이지로 가게 하는 이벤트 함수
    const handleMyPage = () => {
        navigate("/mypage");
    }
    //팀 구인 게시판으로 가게 하는 이벤트 함수
    const handleOfferBoard = () => {
        window.sessionStorage.setItem("category", "Team");
        navigate("/offerboard");
    }
    //질문 게시판으로 가게 하는 이벤트 함수
    const handleQuestionBoard = () => {
        window.sessionStorage.setItem("category", "Question");
        navigate("/questionboard");
    }
    //정보공유 게시판으로 가게 하는 이벤트 함수
    const handleShareBoard = () => {
        window.sessionStorage.setItem("category", "Share");
        navigate("/shareboard");
    }
    //자료 검색 페이지로 가게 하는 이벤트 함수
    const handleInfoSearchPage = () => {
        navigate("/infosearch");
    }
    //팀 검색 페이지로 가게 하는 이벤트 함수
    const handleTeamSearchPage = () => {
        navigate("/teamsearch");
    }
    //쪽지함 페이지로 이동하게 하는 이벤트 함수
    const handleLetter = () => {
        navigate("/letterbox");
    }
    //상점 페이지로 이동하게 하는 이벤트 함수
    const handlePointShop = () => {
        navigate("/shop");
    }

    //로그인 시 닉네임 버튼을 클릭했을 때 새로운 알림 메시지의 유무 표시를 위한 이벤트 함수
    const handleClickNicknameButton = () => {
        if(loadingStatus) {
            setLoadingStatus(false);
        }
        functionGetReadMessageNumber(window.sessionStorage.id, setNotReadMessage, setLoadingStatus);
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" id="navContainer">
                <Navbar.Brand href="/" id="navTitle">Withrium</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link onClick={handlePointShop}>상점</Nav.Link>
                    <Nav.Link onClick={handleTeamMakePageClick}>팀 생성</Nav.Link>
                    <Nav.Link onClick={handleTeamPageClick}>팀 페이지</Nav.Link>
                    <NavDropdown title="검색" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleInfoSearchPage}>자료 검색</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleTeamSearchPage}>팀 검색</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="게시판" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleOfferBoard}>팀 구인 게시판</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleQuestionBoard}>질문 게시판</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleShareBoard}>정보공유 게시판</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav id="userContainer">
                    {window.sessionStorage.id
                    ? <NavDropdown title={window.sessionStorage.nickname} id="basic-nav-dropdown" onClick={handleClickNicknameButton}>
                        <NavDropdown.Item onClick={handleMyPage}>마이페이지</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLetter}>쪽지함{(notReadMessage !== 0 && loadingStatus) ? <span id="readMessageNumberIcon">{notReadMessage}</span> : null}</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                    </NavDropdown>
                    : <div>
                        <button className='signBtn' onClick={handleLoginShow}>Sign In</button>
                        <button className='signBtn' onClick={handleSignUpShow}>Sign Up</button>
                    </div>}
                </Nav>
            </Navbar>
            <Modal show={sessionShow} onHide={handleSessionClose}>
                <Modal.Body>현재 로그인이 되어 있지 않습니다. 로그인 하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleSessionClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleTeamLoginShow}>
                    로그인
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Header;