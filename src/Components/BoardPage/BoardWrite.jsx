//import react router
import { useNavigate } from "react-router-dom";
//import react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
//import react hooks
import { useEffect, useState, useRef } from "react";
//import functions
import functionBoardUserTeamList from "../../Functions/FunctionBoard/functionBoardUserTeamList";
import functionTeamBoardWriteSubmit from "../../Functions/FunctionBoard/functionTeamBoardWriteSubmit";


function BoardWrite() {
    //화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //팀 구인 게시판일 경우 백엔드로부터 받아 온 팀 리스트 값을 저장할 배열 useState 변수
    const [ userTeamList, setUserTeamList ] = useState([]);

    //게시글 submit을 위한 useRef 변수들
    const titleRef = useRef();
    const contentsRef = useRef();
    const teamRef = useRef();

    useEffect(() => {
        //페이지 첫 렌더링 시 팀 구인 게시판이라면 팀 리스트를 받아 오는 요청을 보낸다.
        if(window.sessionStorage.category === "Team") {
            functionBoardUserTeamList(window.sessionStorage.id, setUserTeamList, navigate);
        }
        if(!window.sessionStorage.id) {
            alert("로그인 한 상태에서만 글을 작성할 수 있습니다.");
            navigate("/signin");
        }
    }, []);

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

    //게시글 submit 이벤트 발생 시 호출되는 이벤트 함수
    const handleBoardWriteSubmit = (e) => {
        e.preventDefault();

        //조건에 따라 팀 구인 게시판 백엔드 함수 호출할 것인지, 그 외의 게시판 백엔드 함수를 호출할 것인지 판단하는 코드이다.
        if(window.sessionStorage.category === "Team") {
            functionTeamBoardWriteSubmit(window.sessionStorage.category, teamRef.current.value, window.sessionStorage.id, contentsRef, titleRef, navigate);
        }
        else {
            functionTeamBoardWriteSubmit(window.sessionStorage.category, "", window.sessionStorage.id, contentsRef, titleRef, navigate);
        }
    }

    return (
        <div id='boardDetailAllContainer'>
            <div id="boardDetailContainer">
                <div id="boardTitleContainer">
                    {window.sessionStorage.category === "Team" ? <h4 onClick={handleOfferBoard}>팀 구인 게시판</h4> : 
                            (window.sessionStorage.category === "Question" ? <h4 onClick={handleQuestionBoard}>질문 게시판</h4> : 
                                <h4 onClick={handleShareBoard}>정보 공유 게시판</h4>)}
                        <hr></hr>
                </div>
                <Form onSubmit={handleBoardWriteSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="Input Title" required autoFocus ref={titleRef} maxLength="800" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" placeholder="Input Contents" rows={8} style={{resize:"none"}} maxLength="1000" required ref={contentsRef} />
                    </Form.Group>
                    
                    {window.sessionStorage.category === "Team" ?
                        <FloatingLabel controlId="floatingSelect" label="Select Team">
                            <Form.Select aria-label="Default select example" ref={teamRef}>
                                {userTeamList.map((team) => (
                                    <option value={team[0]} key={team[0]}>{team[0]}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    : null }

                    <Button variant="primary" type="submit" style={{marginTop:"20px", padding:"5px 30px"}}>
                        등록
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default BoardWrite;