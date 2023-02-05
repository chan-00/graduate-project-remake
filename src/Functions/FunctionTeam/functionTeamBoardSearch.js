import axios from "axios";
import server_url from "../../serverUrl.js";

function functionTeamBoardSearch(searchTitle, currentClickTeam, setTeamBoardList, setLoadingStatus) {
    //팀 게시글에서 특정 검색어로 검색할 때 백엔드와 통신하는 코드이다.
    axios.post(server_url + "/back/search_team_post/", {
        teamname: currentClickTeam,
        title: searchTitle
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamBoardList(res.data.post_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardSearch;