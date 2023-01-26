//import react bootstrap
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
//import css
import "../../css/TeamPageCss/TeamMain.css";
//import react hooks
import { useState, useEffect } from 'react';
//import functions
import functionGetTeamInfoList from '../../Functions/FunctionTeam/functionGetTeamInfoList';
//import react router
import { useNavigate } from 'react-router-dom';
//import react component
import TeamListShow from './TeamListShow';


//자신이 갖고 있는 팀의 리스트를 볼 수 있는 팀 메인 페이지 component
function TeamMain() {
    //화면 라우팅을 위한 useNavigate 변수
    const navigate = useNavigate();

    //pagination number array를 반복문으로 돌릴 때 사용할 index 변수
    let number;

    //전체 팀 리스트 배열 값을 담을 useState 변수
    const [ userTeamInfoList, setUserTeamInfoList ] = useState([]);
    //현재 클릭되어 있는 pagination 번호 값을 담을 useState 변수
    const [ currentPageNum, setCurrentPageNum ] = useState(1);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //pagination 버튼을 표시해주기 위한 배열 useState 변수
    const [ paginationNumArray, setPaginationNumArray ] = useState([]);

    //처음 페이지 렌더링 시 팀 리스트 값을 받아오기 위한 useEffect 함수
    useEffect(() => {
        functionGetTeamInfoList(setUserTeamInfoList, window.sessionStorage.id, setLoadingStatus);
    }, []);
    //팀 리스트를 받아온 후 pagination 값을 표시해주기 위한 useEffect 함수
    useEffect(() => {
        const items = [];
        for (number = 1; number <= Math.ceil(userTeamInfoList.length / 15); number++) {
            items.push(
                <Pagination.Item key={number} id={number} onClick={handlePaginationBtnOnClick}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPaginationNumArray(items);
    }, [userTeamInfoList]);

    //pagination에 따라 현재 화면에 팀 리스트를 다르게 보여주게 하기 위한 코드
    const indexOfLast = currentPageNum * 15;
    const indexOfFirst = indexOfLast - 15;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    //pagination에서 마우스로 클릭 시 해당 버튼에 active 효과 부여하기 위한 onclick 함수
    const handlePaginationBtnOnClick = (e) => {
        setCurrentPageNum(e.target.id);
    }

    const handleTeamOfferBoardClick = () => {
        window.sessionStorage.setItem("category", "Team");
        navigate("/offerboard");
    }
    
    if(userTeamInfoList.length !== 0 && loadingStatus) {
        return (
            <div id="teamMainAllContainer">
                <Table id='teamMainContentsContainer'>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>Member</th>
                        </tr>
                    </thead>
                    <TeamListShow posts={currentPosts(userTeamInfoList)}></TeamListShow>
                </Table>
                <div id="teamMainPaginationContainer">
                    <Pagination id='paginationContainer'>{paginationNumArray}</Pagination>
                </div>
            </div>
        )
    }
    else if(userTeamInfoList.length === 0 && loadingStatus) {
        return (
            <div id="teamMainAllContainer" style={{textAlign:"center"}}>
                <p id="teamBelongNoneMessage">소속된 팀이 없습니다.</p>
                <Button variant="outline-primary" className='teamBelongNoneBtn' onClick={() => {navigate("/teammake")}}>팀 생성</Button>
                <Button variant="outline-primary" className='teamBelongNoneBtn' onClick={handleTeamOfferBoardClick}>팀 구인 게시판</Button>
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

export default TeamMain;