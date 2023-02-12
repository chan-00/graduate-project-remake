//import css
import "../../css/MyPageCss/LetterBox.css";
//import react bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
//import react bootstrap icon
import { CaretDownFill, CaretRightFill, XCircle } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState } from "react";
//import react router
import { useNavigate } from "react-router-dom";
//import functions
import functionGetLetterList from "../../Functions/FunctionMyPage/functionGetLetterList";
import functionDeleteLetterListItem from "../../Functions/FunctionMyPage/functionDeleteLetterListItem";
import functionDeleteAllLetterListItem from "../../Functions/FunctionMyPage/functionDeleteAllLetterListItem";

function LetterBox() {
    const navigate = useNavigate();

    //백엔드로부터 전송받을 쪽지 리스트가 저장될 배열 useState 변수
    const [ letterArray, setLetterArray ] = useState([]);
    //첫 렌더링 시 로딩 창을 띄우기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //쪽지함 첫 렌더링 시 백엔드로부터 해당 계정의 쪽지함 리스트를 받아 올 useEffect 함수
    useEffect(() => {
        if(window.sessionStorage.id) {
            functionGetLetterList(window.sessionStorage.id, setLetterArray, setLoadingStatus);
        }
        else {
            alert("로그인이 되어 있지 않습니다!");
            navigate("/signin");
        }
    }, []);

    //특정 리스트 아이템 클릭 시 화면 변화를 보여주기 위한 이벤트 함수
    const handleClickListItem = (index) => {
        const tempArray = [...letterArray];
        tempArray[index][5] = !tempArray[index][5];

        setLetterArray(tempArray);
    }

    //특정 리스트 아이템 삭제 버튼 클릭 시 호출되는 이벤트 함수
    const handleDeleteListItem = (e) => {
        e.stopPropagation();
        functionDeleteLetterListItem(window.sessionStorage.id, e.target.id, setLetterArray);
    }

    //알림 메시지 전체 삭제 버튼 클릭 시 호출되는 이벤트 함수
    const handleDeleteAllListItem = () => {
        functionDeleteAllLetterListItem(window.sessionStorage.id, setLetterArray);
    }

    if(loadingStatus) {
        return (
            <div id="letterPageAllContainer">
                <div id="letterContentsContainer">
                    <h4>{window.sessionStorage.nickname} 님의 쪽지함</h4>
                    {letterArray.length !== 0 ? <button className="outlineDanger" onClick={handleDeleteAllListItem}>전체 삭제</button> : null}
                    {letterArray.length !== 0 ?
                        <ListGroup id="letterListGroupContainer">
                            {letterArray.map((letter, index) => (
                                <ListGroup.Item key={letter[0]} onClick={() => handleClickListItem(index)}>
                                    {letter[5] ? <CaretDownFill/> : <CaretRightFill/>}{letter[1]}{letter[4] === 1 ? <span className="newMessageIcon">N</span> : null}<XCircle id={letter[0]} className="letterDeleteButton" onClick={handleDeleteListItem}/><span>{letter[3]}</span>
                                    {letter[5] ?
                                        <div className="letterContents">
                                            {letter[2]}
                                        </div>
                                    : null}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    : <ListGroup id="letterListGroupContainer">
                        <div id="noneLetterContents">도착한 알림 메시지가 없습니다....</div>
                    </ListGroup>}
                </div>
            </div>
        )
    }
    else {
        return (
            <div id="teamMainAllContainer" style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
    
}

export default LetterBox;