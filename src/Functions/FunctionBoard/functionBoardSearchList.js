import axios from "axios";

function functionBoardSearchList(category, setLoadingStatus, setTeamBoardList, searchRef) {
    //데이터베이스로 sql 쿼리 문으로 데이터를 넘길 때 밑의 3개 값이 포함되면 에러가 발생할 수 있기에 사전 차단하기 위한 조건문을 쓴다.
    if(searchRef.current.value.includes("(") || searchRef.current.value.includes(")") || searchRef.current.value.includes(";")) {
        alert("id에 (, ), ; 값 중 하나 이상이 들어가 있습니다.");
        searchRef.current.focus();
        return false;
    }

    //게시판 첫 렌더링 시 해당 게시판의 게시글 리스트 값을 받아오기 위한 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/search_post/", {
        category: category,
        search: searchRef.current.value,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamBoardList(res.data.post_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardSearchList;