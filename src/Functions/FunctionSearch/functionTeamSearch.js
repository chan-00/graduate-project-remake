import axios from "axios";
import server_ip from "../../serverIP.js";

//사용자가 입력한 팀 이름, 팀 카테고리 값을 백엔드로 전송하여 그에 해당되는 팀 리스트 값을 받아온다.
function functionTeamSearch(category, teamname, setLoadingStatus, setTeamList) {
    axios.post("http://" + server_ip + ":8000/back/team_search/", {
        category: category,
        teamname: teamname
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamList(res.data.team_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamSearch;