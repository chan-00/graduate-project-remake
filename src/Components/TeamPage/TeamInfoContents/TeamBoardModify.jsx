//import react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
//import css
import "../../../css/TeamPageCss/TeamBoardWrite.css";
//import react hooks
import { useRef, useEffect, useState } from 'react';
//import functions
import functionGetTeamBoardInfo from '../../../Functions/FunctionTeam/functionGetTeamBoardInfo';
import functionTeamBoardModify from '../../../Functions/FunctionTeam/functionTeamBoardModify';


function TeamBoardModify({ setSelectedMenu }) {
    //게시글 작성 내용을 알기 위한 ref 변수
    const titleRef=  useRef();
    const contentsRef = useRef();

    //기존 게시글의 정보를 담을 useState 변수
    const [ teamBoardInfo, setTeamBoardInfo ] = useState([]);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //수정 페이지 처음 렌더링 시 기존 게시글의 정보를 받아오기 위한 useEffect 함수
    useEffect(() => {
        functionGetTeamBoardInfo(window.sessionStorage.currentClickTeamBoardID, setTeamBoardInfo, setLoadingStatus);
    }, []);

    //게시판 title 클릭 시 팀 게시판으로 돌아가게끔 하는 이벤트 함수
    const handleTeamBoard = () => {
        setSelectedMenu("TeamBoard");
    }

    //게시글 수정 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamBoardUpdateSubmit = (e) => {
        e.preventDefault();
        functionTeamBoardModify(titleRef.current.value, window.sessionStorage.currentClickTeamBoardID, contentsRef.current.value, setSelectedMenu);
    }

    if(loadingStatus) {
        return (
            <div id="teamBoardAllContainer">
                <div id="teamBoardWriteContentsAllContainer">
                    <div id="boardTitleContainer">
                    <h4 onClick={handleTeamBoard}>{window.sessionStorage.currentClickTeam} 게시판</h4>
                        <hr></hr>
                    </div>
                    <Form onSubmit={handleTeamBoardUpdateSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" placeholder="Input Title" required autoFocus ref={titleRef} maxLength="800" defaultValue={teamBoardInfo[0]} />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" placeholder="Input Contents" rows={8} style={{resize:"none"}} maxLength="1000" required ref={contentsRef} defaultValue={teamBoardInfo[1]} />
                        </Form.Group>
    
                        <Button variant="primary" type="submit" style={{marginTop:"20px", padding:"5px 30px"}}>
                            수정
                        </Button>
                    </Form>
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

export default TeamBoardModify;