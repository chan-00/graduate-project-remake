//import css
import "../../css/MyPageCss/LetterBox.css";
//import react bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//import react bootstrap icon
import { CaretDownFill, CaretRightFill, XCircle } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState } from "react";
//import react router
import { useNavigate } from "react-router-dom";
//import functions
import functionGetLetterList from "../../Functions/FunctionMyPage/functionGetLetterList";

function LetterBox() {
    const navigate = useNavigate();

    //백엔드로부터 전송받을 쪽지 리스트가 저장될 배열 useState 변수
    const [ letterArray, setLetterArray ] = useState([]);

    //쪽지함 첫 렌더링 시 백엔드로부터 해당 계정의 쪽지함 리스트를 받아 올 useEffect 함수
    useEffect(() => {
        if(window.sessionStorage.id) {
            functionGetLetterList(window.sessionStorage.id, setLetterArray);
        }
        else {
            alert("로그인이 되어 있지 않습니다!");
            navigate("/signin");
        }
    }, []);

    return (
        <div id="letterPageAllContainer">
            <div id="letterContentsContainer">
                <h4>{window.sessionStorage.nickname} 님의 쪽지함</h4>
                <button className="outlineDanger">전체 삭제</button>
                <ListGroup id="letterListGroupContainer">
                    <ListGroup.Item><CaretRightFill/>Cras justo odio<XCircle/></ListGroup.Item>
                    {letterArray.map((letter) => (
                        <ListGroup.Item key={letter[0]} id={letter[0]}><CaretRightFill/>{letter[1]}<XCircle/></ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

export default LetterBox;