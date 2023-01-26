//import css
import "../../css/SearchPage/InfoSearch.css";
//import react hooks
import { useState, useRef } from "react";
//import functions
import functionGetInfoSearch from "../../Functions/FunctionSearch/functionGetInfoSearch";
import functionGetInfoMoveSearch from "../../Functions/FunctionSearch/functionGetInfoMoveSearch";


function InfoSearch() {
    //검색어 input 값을 알기 위한 ref 변수
    const searchTextRef = useRef();

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
                            <button className="shareBtn outlinePrimary">공유</button>
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
        </div>
    )
}

export default InfoSearch;