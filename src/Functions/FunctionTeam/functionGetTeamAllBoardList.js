import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetTeamAllBoardList(setTeamBoardList, currentClickTeam, setLoadingStatus) {
    axios.post(server_url + "/back/team_post_list/", {
        teamname: currentClickTeam
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamBoardList(res.data.post_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetTeamAllBoardList;