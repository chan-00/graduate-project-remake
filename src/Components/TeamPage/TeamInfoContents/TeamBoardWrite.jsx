//import react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import css
import "../../../css/TeamPageCss/TeamBoardWrite.css";
//import react hooks
import { useRef } from 'react';
//import functions
import functionTeamBoardWrite from '../../../Functions/FunctionTeam/functionTeamBoardWrite';
import functionTeamBoardFirstFileWrite from '../../../Functions/FunctionTeam/functionTeamBoardFirstFileWrite';
//import atom
import { useSetRecoilState } from "recoil";
import atomTeamSelectedMenu from "../../../Atoms/atomTeamSelectedMenu"


function TeamBoardWrite() {
    //현재 페이지에서 선택된 파일에 대한 정보가 담길 변수
    let uploadFiles;
    //파일이 포함될 formData 변수
    let formData;

    //현재 선택된 메뉴에 대한 값을 갖고 있는 recoil set 함수
    const setSelectedMenu = useSetRecoilState(atomTeamSelectedMenu);

    //게시글 작성 내용을 알기 위한 ref 변수
    const titleRef=  useRef();
    const contentsRef = useRef();

    //게시판 title 클릭 시 팀 게시판으로 돌아가게끔 하는 이벤트 함수
    const handleTeamBoard = () => {
        setSelectedMenu("TeamBoard");
    }

    //파일을 선택했을 때 해당 파일에 대한 정보를 useState에 담는 onChange 이벤트 함수
    const handleChangeFile = (e) => {
        uploadFiles = e.target.files[0];

        if(uploadFiles) {
            formData = new FormData();
            formData.append('files', uploadFiles);
        }
    }

    //게시글 작성 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamBoardWriteSubmit = (e) => {
        e.preventDefault();

        if(formData) {
            functionTeamBoardFirstFileWrite(titleRef.current.value, contentsRef.current.value, window.sessionStorage.id, window.sessionStorage.currentClickTeam, setSelectedMenu, "file_save", formData);
        }
        else {
            functionTeamBoardWrite(titleRef.current.value, contentsRef.current.value, window.sessionStorage.id, window.sessionStorage.currentClickTeam, setSelectedMenu, "normal");
        }
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

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>첨부 파일</Form.Label>
                        <Form.Control type="file" onChange={handleChangeFile} />
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