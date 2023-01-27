//import react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import css
import "../../../css/TeamPageCss/TeamBoardWrite.css";
//import react hooks
import { useRef } from 'react';
//import functions
import functionTeamBoardWrite from '../../../Functions/FunctionTeam/functionTeamBoardWrite';


function TeamBoardWrite({ setSelectedMenu }) {

    //게시글 작성 내용을 알기 위한 ref 변수
    const titleRef=  useRef();
    const contentsRef = useRef();

    //게시판 title 클릭 시 팀 게시판으로 돌아가게끔 하는 이벤트 함수
    const handleTeamBoard = () => {
        setSelectedMenu("TeamBoard");
    }

    //게시글 작성 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamBoardWriteSubmit = (e) => {
        e.preventDefault();
        functionTeamBoardWrite(titleRef.current.value, contentsRef.current.value, window.sessionStorage.id, window.sessionStorage.currentClickTeam, setSelectedMenu);
    }

    return (
        <div id="teamBoardAllContainer">
            <div id="teamBoardWriteContentsAllContainer">
                <div id="boardTitleContainer">
                <h4 onClick={handleTeamBoard}>{window.sessionStorage.currentClickTeam} 게시판</h4>
                    <hr></hr>
                </div>
                <Form onSubmit={handleTeamBoardWriteSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="Input Title" required autoFocus ref={titleRef} maxLength="800" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" placeholder="Input Contents" rows={8} style={{resize:"none"}} maxLength="1000" required ref={contentsRef} />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{marginTop:"20px", padding:"5px 30px"}}>
                        등록
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default TeamBoardWrite;