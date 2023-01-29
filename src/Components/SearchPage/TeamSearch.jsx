//import css
import "../../css/SearchPage/TeamSearch.css";
//import react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useRef, useState } from "react";
//import functions
import functionTeamSearch from "../../Functions/FunctionSearch/functionTeamSearch";
//import react component
import TeamListShow from "../TeamPage/TeamListShow";
//import react router
import { useNavigate } from 'react-router-dom';

function TeamSearch() {
    //화면 라우팅을 위한 useNavigate 변수
    const navigate = useNavigate();

    //pagination number array를 반복문으로 돌릴 때 사용할 index 변수
    let number;

    //팀명 input과 연결된 ref 변수
    const teamNameRef = useRef();
    //카테고리와 연결된 ref 변수
    const teamCategoryRef = useRef();

    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //팀 리스트 값을 담을 useState 변수
    const [ teamList, setTeamList ] = useState([]);
    //현재 클릭되어 있는 pagination 번호 값을 담을 useState 변수
    const [ currentPageNum, setCurrentPageNum ] = useState(1);
    //pagination 버튼을 표시해주기 위한 배열 useState 변수
    const [ paginationNumArray, setPaginationNumArray ] = useState([]);
    //팀에 속한 팀원들의 프로필 사진 base64 값을 담을 배열 useState 변수
    const [ userProfileInfo, setUserProfileInfo ] = useState([]);

    //팀 검색 페이지 첫 렌더링 시 전체 팀 리스트를 백엔드로부터 받아 오기 위한 useEffect 함수
    useEffect(() => {
        functionTeamSearch("All", "", setLoadingStatus, setTeamList, setUserProfileInfo, setCurrentPageNum);
    }, []);
    //팀 리스트를 받아온 후 pagination 값을 표시해주기 위한 useEffect 함수
    useEffect(() => {
        const items = [];
        for (number = 1; number <= Math.ceil(teamList.length / 10); number++) {
            items.push(
                <Pagination.Item key={number} id={number} onClick={handlePaginationBtnOnClick}>
                    {number}
                </Pagination.Item>,
            );
        }
        setPaginationNumArray(items);
    }, [teamList]);

    //pagination에 따라 현재 화면에 팀 리스트를 다르게 보여주게 하기 위한 코드
    const indexOfLast = currentPageNum * 10;
    const indexOfFirst = indexOfLast - 10;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };
    //pagination에 따라 현재 페이지에 해당하는 프로필 사진을 보여주기 위한 페이지네이션 코드
    const currentPhotoPosts = (photos) => {
        let currentPosts = 0;
        currentPosts = photos.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    //pagination에서 마우스로 클릭 시 해당 버튼에 active 효과 부여하기 위한 onclick 함수
    const handlePaginationBtnOnClick = (e) => {
        setCurrentPageNum(e.target.id);
    }

    //팀 검색 버튼 클릭 시 호출되는 이벤트 함수
    const handleTeamSearch = (e) => {
        e.preventDefault();
        setLoadingStatus(false);

        functionTeamSearch(teamCategoryRef.current.value, teamNameRef.current.value, setLoadingStatus, setTeamList, setUserProfileInfo, setCurrentPageNum);
    }

    return (
        <div id="teamSearchAllContainer">
            <Form onSubmit={handleTeamSearch} id="teamSearchFormContainer">
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Control type="text" placeholder="Input Title" autoFocus ref={teamNameRef} maxLength="800" />
                </Form.Group>
                
                <FloatingLabel controlId="floatingSelect" label="Select Team Category">
                    <Form.Select aria-label="Default select example" ref={teamCategoryRef}>
                        <option value="All">All</option>
                        <option value="IT">IT</option>
                        <option value="문화">문화</option>
                        <option value="수학">수학</option>
                        <option value="과학">과학</option>
                        <option value="언어">언어</option>
                        <option value="경제">경제</option>
                        <option value="문학/창작">문학/창작</option>
                        <option value="사회">사회</option>
                        <option value="기타">기타</option>
                    </Form.Select>
                </FloatingLabel>

                <Button variant="primary" type="submit" style={{padding:"5px 10%", marginTop:"20px"}}>
                    검색
                </Button>
            </Form>

            {!loadingStatus ? 
                <div id="teamMainAllContainer" style={{textAlign:"center"}}>
                    <Spinner animation="border" />
                </div>
            : 
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
                        <TeamListShow posts={currentPosts(teamList)} userProfileInfo={currentPhotoPosts(userProfileInfo)}></TeamListShow>
                    </Table>
                    <div id="teamMainPaginationContainer">
                        <Pagination id='paginationContainer'>{paginationNumArray}</Pagination>
                    </div>
                </div>
            }
        </div>
    )
}

export default TeamSearch;