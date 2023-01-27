//import css
import "../../css/SearchPage/InfoSearch.css";
//import react bootstrap
import { Button, Modal, Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
//import react hooks
import { useState, useRef, useEffect } from "react";
//import functions
import functionGetInfoSearch from "../../Functions/FunctionSearch/functionGetInfoSearch";
import functionGetInfoMoveSearch from "../../Functions/FunctionSearch/functionGetInfoMoveSearch";
import functionShareUserTeamList from "../../Functions/FunctionSearch/functionShareUserTeamList";
import functionSharePublicBoard from "../../Functions/FunctionSearch/functionSharePublicBoard";
import functionShareTeamBoard from "../../Functions/FunctionSearch/functionShareTeamBoard";
//import react router
import { useNavigate } from "react-router-dom";


function InfoSearch() {
    //공유 이후 화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //검색어 input 값을 알기 위한 ref 변수
    const searchTextRef = useRef();
    //URL 공유 시 게시글 제목 값을 알기 위한 ref 변수
    const shareBoardTitleRef = useRef();
    //팀 게시판에 공유할 때 어떤 팀 게시판에 공유할 것인지에 대한 정보가 담길 변수
    const teamRef = useRef();
    //공용 게시판에 공유할 때 어떤 게시판에 공유할 것인지에 대한 정보가 담길 변수
    const categoryRef = useRef();

    //검색 결과 첫 렌더링 시 검색 결과 리스트를 받아오기 전까지 로딩 창을 띄우기 위한 useState 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //검색 결과를 담을 배열 useState 변수
    const [ searchResultArray, setSearchResultArray ] = useState([]);
    //검색어 텍스트를 담기 위한 useState 변수
    const [ searchText, setSearchText ] = useState("");
    //검색 결과 다음 페이지의 존재 여부를 담고 있을 변수
    const [ startIndex, setStartIndex ] = useState(0);
    //검색 결과 이전 페이지의 존재 여부를 담고 있을 변수
    const [ previousIndex, setPreviousIndex ] = useState(0);
    //공유 버튼 클릭 시 해당 url을 공유할 수 있는 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ searchShareModalShow, setSearchShareModalShow ] = useState(false);
    //공유 버튼 클릭 시 어떤 게시판에 url을 공유할 것인지에 대한 Modal 창을 띄우게 하도록 하는 Boolean useState 변수
    const [ shareModeShow, setShareModeShow ] = useState(false);
    //어떤 게시판에 공유하는지에 대한 값을 저장하는 useState 변수
    const [ shareBoardType, setShareBoardType ] = useState("");
    //해당 유저의 팀 리스트에 대한 정보를 담을 useState 변수
    const [ userTeamList, setUserTeamList ] = useState([]);
    //공유 버튼을 눌렀을 때 해당 URL에 대한 정보를 담고 있을 변수
    const [ shareUrlInfo, setShareUrlInfo ] = useState([]);

    useEffect(() => {
        if(shareBoardType === "Team") {
            functionShareUserTeamList(window.sessionStorage.id, setUserTeamList, handleSearchShareModalClose);
        }
    }, [shareBoardType]);

    //검색어 입력 후 검색 submit 이벤트 발생 시 호출되는 이벤트 함수
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        functionGetInfoSearch(setLoadingStatus, setSearchResultArray, searchTextRef, setSearchText, setStartIndex, setPreviousIndex);
    }
    //검색 결과 출력 시 이전 검색 결과 버튼 클릭했을 때 호출되는 이벤트 함수
    const handlePreviousSearchSubmit = () => {
        functionGetInfoMoveSearch(setSearchResultArray, searchText, setStartIndex, setPreviousIndex, previousIndex);
    }
    //검색 결과 출력 시 다음 검색 결과 버튼 클릭했을 때 호출되는 이벤트 함수
    const handleNextSearchSubmit = () => {
        functionGetInfoMoveSearch(setSearchResultArray, searchText, setStartIndex, setPreviousIndex, startIndex);
    }

    //url input Modal 창을 켜고 끄는 함수이다.
    const handleSearchShareModalShow = () => setSearchShareModalShow(true);
    const handleSearchShareModalClose = () => setSearchShareModalShow(false);
    //share type select Modal 창을 켜고 끄는 함수이다.
    const handleSelectShareTypeModalShow = () => setShareModeShow(true);
    const handleSelectShareTypeModalClose = () => setShareModeShow(false);

    //검색 후 특정 URL에 대해 공유 버튼을 클릭했을 때 호출되는 이벤트 함수이다.
    const handleShareButtonClick = (result) => {
        if(window.sessionStorage.id) {
            setShareUrlInfo(result);
            handleSelectShareTypeModalShow();
        }
        else {
            alert("로그인이 필요한 기능입니다.");
        }
    }

    //Share Select Modal 창에서 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleSelectShareMode = (mode) => {
        handleSelectShareTypeModalClose();
        handleSearchShareModalShow();
        setShareBoardType(mode);
    }

    //URL 공유 Modal창에서 공유 버튼 클릭 시 호출되는 이벤트 함수이다.
    const handleSearchShare = (e) => {
        e.preventDefault();
        const contents = `${shareUrlInfo.title}(게시글구분문자열)${shareUrlInfo.link}(게시글구분문자열)${shareUrlInfo.snippet}`;

        if(shareBoardType === "Public") {
            functionSharePublicBoard(window.sessionStorage.id, shareBoardTitleRef.current.value, contents, categoryRef.current.value, handleSearchShareModalClose, navigate);
        }
        else if(shareBoardType === "Team") {
            functionShareTeamBoard(window.sessionStorage.id, shareBoardTitleRef.current.value, contents, teamRef.current.value, handleSearchShareModalClose, navigate);
        }
    }

    return (
        <div id="infoSearchAllContainer">
            <h3>Withrium Information Search</h3>
            <form id="searchContainer" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    required
                    placeholder="검색어를 입력하세요."
                    ref={searchTextRef}
                />
                <button type="submit" className="outlinePrimary">검색</button>
            </form>
            <div id="searchResultContainer">
                {!loadingStatus ?
                    <div className="noSearch">
                        <span>검색어를 입력하고 검색 버튼을 누르세요.</span>
                    </div>
                : (searchResultArray === undefined) ? 
                    <div className="noSearch">
                        <span>해당 검색어에 대한 검색 결과가 없습니다...</span>
                    </div>
                : <div>
                    {searchResultArray.map((result, index) => (
                        <div key={index} className="searchResultContentsContainer">
                            <button className="shareBtn outlinePrimary" onClick={() => handleShareButtonClick(result)}>공유</button>
                            <a href={result.link} target="_blank">{result.title}</a>
                            <p>{result.snippet}</p>
                        </div>
                    ))}
                    <div id="searchMoveBtnContainer">
                        {previousIndex !== 0 ? <button onClick={handlePreviousSearchSubmit}>&lt;</button> : null}
                        {startIndex !== 0 ? <button onClick={handleNextSearchSubmit}>&gt;</button> : null}
                    </div>
                </div>
                }
            </div>
            <Modal 
                show={shareModeShow} 
                onHide={handleSelectShareTypeModalClose}
                >
                <Modal.Header closeButton>
                    <h4>Select Share Board</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="signButtonContainer" style={{marginTop:"20px", textAlign:"center"}}>
                        <Button variant="outline-primary" className="modifyButtons" style={{fontSize:"13px", padding:"10px 15px", marginBottom:"20px"}} onClick={() => handleSelectShareMode("Team")}>팀 게시판</Button>
                        <Button variant="outline-primary" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px", padding:"10px 15px", marginBottom:"20px"}} onClick={() => handleSelectShareMode("Public")}>공용 게시판</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal 
                show={searchShareModalShow} 
                onHide={handleSearchShareModalClose}
                >
                <Modal.Header closeButton>
                    <h4>URL Share</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="signContainer" onSubmit={handleSearchShare}>
                        {shareBoardType === "Team" ? 
                            <FloatingLabel controlId="floatingSelect" label="Select Team">
                                <Form.Select aria-label="Default select example" ref={teamRef}>
                                    {userTeamList.map((team) => (
                                        <option value={team[0]} key={team[0]}>{team[0]}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        : <FloatingLabel controlId="floatingSelect" label="Select Team">
                            <Form.Select aria-label="Default select example" ref={categoryRef}>
                                <option value="Question">질문 게시판</option>
                                <option value="Share">정보 공유 게시판</option>
                            </Form.Select>
                        </FloatingLabel>}
                        <div>
                            <input
                                type="text"
                                placeholder="Input Title"
                                ref={shareBoardTitleRef}
                                maxLength="800"
                                autoFocus
                                required
                                className="formElements inputElements"
                                style={{marginTop:"10px", borderRadius:"5px"}}
                            />
                        </div>
                        <div className="signButtonContainer" style={{marginTop:"20px"}}>
                            <Button type="submit" variant="outline-primary" className="modifyButtons" style={{fontSize:"13px"}}>공유</Button>
                            <Button variant="outline-danger" className="modifyButtons" style={{marginLeft:"10px", fontSize:"13px"}} onClick={handleSearchShareModalClose}>취소</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default InfoSearch;