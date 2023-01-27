//import css
import "../../../css/TeamPageCss/TeamBoard.css";
//import react bootstrap
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState, useRef } from "react";
//import functions
import functionGetTeamAllBoardList from "../../../Functions/FunctionTeam/functionGetTeamAllBoardList";
import functionTeamBoardSearch from "../../../Functions/FunctionTeam/functionTeamBoardSearch";
//import components
import TeamBoardListShow from "./TeamBoardListShow";
//import react router
import { useNavigate } from "react-router-dom";


function TeamBoard({ setSelectedMenu }) {
    //pagination number array를 반복문으로 돌릴 때 사용할 index 변수
    let number;

    //화면 전환을 위한 navigate 함수
    const navigate = useNavigate();

    //검색어 input과 연결된 ref 변수
    const searchRef = useRef();

    //팀 게시글 데이터를 받아 저장할 useState 변수
    const [ teamBoardList, setTeamBoardList ] = useState([]);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //현재 클릭되어 있는 pagination 번호 값을 담을 useState 변수
    const [ currentPageNum, setCurrentPageNum ] = useState(1);
    //pagination 버튼을 표시해주기 위한 배열 useState 변수
    const [ paginationNumArray, setPaginationNumArray ] = useState([]);

    //팀 게시판 첫 렌더링 시 전체 게시글 리스트 값을 받아 오기 위한 useEffect 함수
    useEffect(() => {
        functionGetTeamAllBoardList(setTeamBoardList, window.sessionStorage.currentClickTeam, setLoadingStatus);
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

    //pagination에 따라 현재 화면에 팀 리스트를 다르게 보여주게 하기 위한 코드
    const indexOfLast = currentPageNum * 15;
    const indexOfFirst = indexOfLast - 15;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    //게시글 검색 시 호출되는 이벤트 함수
    const handleTeamBoardSearch = (e) => {
        e.preventDefault();
        setLoadingStatus(false);
        functionTeamBoardSearch(searchRef.current.value, window.sessionStorage.currentClickTeam, setTeamBoardList, setLoadingStatus);
    }

    if(loadingStatus) {
        return (
            <div id="teamBoardAllContainer">
                <div id="teamBoardContentsAllContainer">
                    <div className="boardTitleContainer" style={{marginLeft: "40%", marginBottom: "20px"}}>
                        <h4 onClick={() => functionGetTeamAllBoardList(setTeamBoardList, window.sessionStorage.currentClickTeam, setLoadingStatus)} style={{cursor:"pointer"}}>{window.sessionStorage.currentClickTeam} 게시판</h4>
                    </div>
                    <div className="boardButtonContainer">
                        <button onClick={() => setSelectedMenu("BoardWrite")}>글 작성</button>
                        <form className="boardSearchContainer" onSubmit={handleTeamBoardSearch}>
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
                                <th>작성일</th>
                            </tr>
                        </thead>
                        <TeamBoardListShow posts={currentPosts(teamBoardList)} setSelectedMenu={setSelectedMenu}></TeamBoardListShow>
                    </Table>
                    <div id="teamMainPaginationContainer">
                        <Pagination id='paginationContainer'>{paginationNumArray}</Pagination>
                    </div>
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

export default TeamBoard;