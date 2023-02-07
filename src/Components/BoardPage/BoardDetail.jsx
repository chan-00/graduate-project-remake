//import css
import "../../css/BoardPageCss/BoardDetail.css";
//import react bootstrap
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
//import react bootstrap icons
import { HandThumbsUpFill, ArrowReturnRight } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState, useRef } from "react";
//import functions
import functionBoardDetail from "../../Functions/FunctionBoard/functionBoardDetail";
import functionBoardCommentWrite from "../../Functions/FunctionBoard/functionBoardCommentWrite";
import functionBoardRecommend from "../../Functions/FunctionBoard/functionBoardRecommend";
import functionBoardCommentModify from "../../Functions/FunctionBoard/functionBoardCommendModify";
import functionBoardDelete from "../../Functions/FunctionBoard/functionBoardDelete";
//import react router
import { useNavigate } from "react-router-dom";
//import react component
import BoardCommentListShow from "./BoardCommentListShow";


function BoardDetail() {
    //pagination number array를 반복문으로 돌릴 때 사용할 index 변수
    let number;

    //화면 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //댓글 작성 textarea와 연결된 useRef 변수
    const commentRef = useRef();

    //게시글 내용을 담을 배열 useState 변수
    const [ boardInfo, setBoardInfo ] = useState([]);
    //댓글 내용을 담을 배열 useState 변수
    const [ commentInfo, setCommentInfo ] = useState([]);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //현재 클릭되어 있는 pagination 번호 값을 담을 useState 변수
    const [ currentPageNum, setCurrentPageNum ] = useState(1);
    //pagination 버튼을 표시해주기 위한 배열 useState 변수
    const [ paginationNumArray, setPaginationNumArray ] = useState([]);
    //현재 댓글 작성이 수정 상태인지 아닌지를 표현하는 boolean useState 변수
    const [ modifyState, setModifyState ] = useState("");
    //자료 공유 게시글일 경우 해당 자료에 대한 정보를 나눠 담을 배열
    const [ shareInfo, setShareInfo ] = useState([]);

    //게시글 첫 렌더링 시 해당 게시글의 내용을 받아오기 위한 useEffect 함수
    useEffect(() => {
        if(window.sessionStorage.currentClickBoardID) {
            functionBoardDetail(window.sessionStorage.currentClickBoardID, setBoardInfo, setCommentInfo, setLoadingStatus);
        }
        else {
            alert("비정상적인 접근입니다.");
            navigate("/");
        }
    }, []);
    //백엔드로부터 댓글 리스트를 받아왔을 때 pagination 번호를 매기기 위한 코드
    useEffect(() => {
        const items = [];
        for (number = 1; number <= Math.ceil(commentInfo.length / 10); number++) {
            items.push(
                <Pagination.Item key={number} id={number} onClick={handlePaginationBtnOnClick}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPaginationNumArray(items);
    }, [commentInfo]);
    //백엔드로부터 게시글 정보를 받아왔을 때 자료 공유 게시물일 경우 데이터를 변수에 나눠 저장하기 위한 useEffect 함수
    useEffect(() => {
        if(boardInfo[7] === "share") {
            const tempShareInfo = boardInfo[4].split("(게시글구분문자열)");
            setShareInfo(tempShareInfo);
        }
    }, [boardInfo]);

    //pagination에서 마우스로 클릭 시 해당 버튼에 active 효과 부여하기 위한 onclick 함수
    const handlePaginationBtnOnClick = (e) => {
        setCurrentPageNum(e.target.id);
    }

    //pagination에 따라 현재 화면에 팀 리스트를 다르게 보여주게 하기 위한 코드
    const indexOfLast = currentPageNum * 10;
    const indexOfFirst = indexOfLast - 10;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

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

    //게시글 내에서 팀 페이지 바로 가기 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamButtonClick = () => {
        window.sessionStorage.setItem("currentClickTeam", boardInfo[5]);
        window.sessionStorage.setItem("teamSelectMenuValue", "TeamInfo");
        navigate("/teaminfo");
    }

    //게시글에서 사용자가 댓글 작성 후 등록 버튼 클릭 시 호출되는 이벤트 함수
    const handleWriteComment = () => {
        //modifyState 문자열의 길이값이 0이 아니라는 것은 현재 수정 상태에서 댓글을 작성한다는 것이므로 백엔드에 수정 요청을 보내는 함수 호출,
        //문자열 길이값이 0이라면 수정 상태가 아닌 그냥 댓글을 작성하는 상태이므로 백엔드에 댓글 생성 요청을 보내는 함수를 호출한다.
        if(modifyState.length !== 0) {
            functionBoardCommentModify(window.sessionStorage.currentClickBoardID, modifyState, commentRef, setCommentInfo, setModifyState);
        }
        else if(modifyState.length === 0) {
            functionBoardCommentWrite(window.sessionStorage.id, window.sessionStorage.currentClickBoardID, commentRef, setCommentInfo);
        }
    }

    //게시글 수정 버튼 클릭 시 호출되는 이벤트 함수
    const handleBoardModify = () => {
        navigate("/boardmodify");
    }
    //게시글 삭제 버튼 클릭 시 호출되는 이벤트 함수
    const handleBoardDelete = () => {
        functionBoardDelete(window.sessionStorage.currentClickBoardID, navigate);
    }

    //댓글 작성 textarea 영역에서 키보드 키 입력 시 호출되는 이벤트 함수
    const handleCommentKeyDown = (e) => {
        //e.code === "Enter"로 textarea 영역에서 엔터키를 누른 상황 인식
        //!e.shiftKey로 엔터키와 함께 shift 키를 눌렀는지 여부 조사하여 이 조건식이 true라면 엔터키만 누른 상태임을 확인할 수 있다.
        //!e.nativeEvent.isComposing으로 조합 문자(ex : 한글) 사용 시 현재 입력하는 문자가 조합 중이라면 이 조건식을 넣지 않는 경우 똑같은 내용으로 댓글 작성이 2번 일어난다.
        //위의 상황을 방지하기 위해 !e.nativeEvent.isComposing 조건식을 추가하여 이 조건식이 true라면 문자가 조합 중이라도 Enter키 입력했을 때 한 번만 백엔드와 통신하는 함수의 호출을 할 수 있게 된다.
        if(e.code === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            handleWriteComment();
        }
    }

    //게시글에서 사용자가 추천 버튼 클릭 시 호출되는 이벤트 함수
    const handleRecommendBoard = () => {
        functionBoardRecommend(window.sessionStorage.currentClickBoardID, setBoardInfo, boardInfo[3]);
    }

    //자료 공유 게시글일 경우 자료 공유 영역 클릭 시 호출되는 이벤트 함수
    const handleShareInfoClick = () => {
        window.open(shareInfo[1]);
    }

    if(loadingStatus) {
        return (
            <div id='boardDetailAllContainer'>
                <div id="boardDetailContainer">
                    <div id="boardTitleContainer">
                        {window.sessionStorage.category === "Team" ? <h4 onClick={handleOfferBoard}>팀 구인 게시판</h4> : 
                            (window.sessionStorage.category === "Question" ? <h4 onClick={handleQuestionBoard}>질문 게시판</h4> : 
                                <h4 onClick={handleShareBoard}>정보 공유 게시판</h4>)}
                        <hr></hr>
                        <div id="boardContentsTitleContainer">
                            <span>{boardInfo[0]}</span>
                            {(boardInfo[1] === window.sessionStorage.nickname && boardInfo[7] !== "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlinePrimary" onClick={handleBoardModify}>수정</button> 
                                    <button className="outlineDanger" onClick={handleBoardDelete}>삭제</button>
                                </div>
                            : (boardInfo[1] === window.sessionStorage.nickname && boardInfo[7] === "share") ?
                                <div id="boardButtonContainer">
                                    <button className="outlineDanger" onClick={handleBoardDelete}>삭제</button>
                                </div>
                        : null}
                        </div>
                        <div id="boardAdditionInfoContainer">
                            <span>{boardInfo[1]}</span>
                            <span>{boardInfo[6]}</span>
                            <div>
                                <span>조회 {boardInfo[2]}</span>
                                <span>추천 {boardInfo[3]}</span>
                                <span>댓글 {commentInfo.length}</span>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                    <div id="boardContentsContainer">
                        {boardInfo[5] ? 
                            <button id="boardTeamButton" onClick={handleTeamButtonClick}>
                                {boardInfo[5]} 페이지 바로 가기
                            </button>
                        :   null
                        }
                        {boardInfo[7] !== "share" ? 
                            <pre>{boardInfo[4]}</pre>
                        :
                            <div id="shareInfoContainer" onClick={handleShareInfoClick}>
                                <h4>{shareInfo[0]}</h4>
                                <p>{shareInfo[2]}</p>
                            </div>
                        }
                        
                    </div>
                    <div id="boardCommentsContainer">
                        <div id="boardCommentsIntroContainer">
                            <div onClick={handleRecommendBoard}>
                                <HandThumbsUpFill></HandThumbsUpFill>
                                <span>추천</span>
                            </div>
                        </div>
                        <hr></hr>
                        <BoardCommentListShow posts={currentPosts(commentInfo)} commentRef={commentRef} setModifyState={setModifyState} setCommentInfo={setCommentInfo}></BoardCommentListShow>
                        {window.sessionStorage.id ? 
                            <div id="boardCommentsWriteContainer">
                                <ArrowReturnRight></ArrowReturnRight>
                                <span>{window.sessionStorage.nickname}</span>
                                <textarea 
                                    placeholder="Input your comments!"
                                    maxLength="800"
                                    required
                                    ref={commentRef}
                                    onKeyDown={handleCommentKeyDown}
                                ></textarea>
                                <button onClick={handleWriteComment}>등록</button>
                            </div>
                        : null}
                        <div id="teamMainPaginationContainer">
                            <Pagination id='paginationContainer'>{paginationNumArray}</Pagination>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id='boardDetailAllContainer' style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
}

export default BoardDetail;