//import css
import "../../css/BoardPageCss/OfferBoard.css";
//import react bootstrap
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState, useRef } from "react";
//import functions
import functionBoardList from "../../Functions/FunctionBoard/functionBoardList";
import functionBoardSearchList from "../../Functions/FunctionBoard/functionBoardSearchList";
//import component
import BoardListShow from "./BoardListShow";
//import react router
import { useNavigate } from "react-router-dom";


function OfferBoard() {
    //pagination number array를 반복문으로 돌릴 때 사용할 index 변수
    let number;

    //화면 전환을 위한 navigate 함수
    const navigate = useNavigate();

    //검색어 입력 input에 연결된 ref 변수
    const searchRef = useRef();

    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //백엔드로부터 게시글 리스트를 받아오는 useState 변수
    const [ teamBoardList, setTeamBoardList ] = useState([]);
    //현재 클릭되어 있는 pagination 번호 값을 담을 useState 변수
    const [ currentPageNum, setCurrentPageNum ] = useState(1);
    //pagination 버튼을 표시해주기 위한 배열 useState 변수
    const [ paginationNumArray, setPaginationNumArray ] = useState([]);

    //페이지 첫 렌더링 시 게시판 카테고리에 맞게 작성된 게시글 리스트들을 백엔드로부터 받아오는 함수 호출
    useEffect(() => {
        functionBoardList(window.sessionStorage.category, setLoadingStatus, setTeamBoardList);
    }, []);
    //백엔드로부터 게시글 리스트를 받아왔을 때 pagination 번호를 매기기 위한 코드
    useEffect(() => {
        const items = [];
        for (number = 1; number <= Math.ceil(teamBoardList.length / 15); number++) {
            items.push(
                <Pagination.Item key={number} id={number} onClick={handlePaginationBtnOnClick}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPaginationNumArray(items);
    }, [teamBoardList]);

    //pagination에서 마우스로 클릭 시 해당 버튼에 active 효과 부여하기 위한 onclick 함수
    const handlePaginationBtnOnClick = (e) => {
        setCurrentPageNum(e.target.id);
    }

    //게시판 Header 클릭 시 해당 게시판의 메인 페이지로 가게 하는 onClick 이벤트 함수
    const handleClickBoardHeader = () => {
        navigate("/offerboard");
        functionBoardList(window.sessionStorage.category, setLoadingStatus, setTeamBoardList);
    }

    //제목 검색어 입력 후 submit 이벤트 발생 시 호출되는 이벤트 함수
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setLoadingStatus(false);

        functionBoardSearchList(window.sessionStorage.category, setLoadingStatus, setTeamBoardList, searchRef)
    }

    //글 작성 버튼 클릭 시 글 작성 페이지로 이동하게 하는 이벤트 함수
    const handleClickWriteBoard = () => {
        if(window.sessionStorage.id) {
            navigate("/boardwrite");
        }
        else {
            alert("로그인이 되어 있지 않습니다!");
            navigate("/signin");
        }
    }

    //pagination에 따라 현재 화면에 팀 리스트를 다르게 보여주게 하기 위한 코드
    const indexOfLast = currentPageNum * 15;
    const indexOfFirst = indexOfLast - 15;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    if(loadingStatus) {
        return (
            <div className="boardAllContainer">
                <div className="boardTitleContainer">
                    <h4 onClick={handleClickBoardHeader}>팀 구인 게시판</h4>
                </div>
                <div className="boardButtonContainer">
                    <button onClick={handleClickWriteBoard}>글 작성</button>
                    <form className="boardSearchContainer" onSubmit={handleSearchSubmit}>
                        <input 
                            type="text"
                            placeholder="검색어를 입력하세요."
                            ref={searchRef}/>
                        <button type="submit">검색</button>
                    </form>
                </div>
                <Table className='boardMainContentsContainer'>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>댓글</th>
                            <th>조회</th>
                            <th>추천</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <BoardListShow posts={currentPosts(teamBoardList)}></BoardListShow>
                </Table>
                <div id="teamMainPaginationContainer">
                    <Pagination id='paginationContainer'>{paginationNumArray}</Pagination>
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

export default OfferBoard;