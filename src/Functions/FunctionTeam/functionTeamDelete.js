import axios from "axios";
import server_url from "../../serverUrl.js";

function functionTeamDelete(currentClickTeam, navigate, handleTeamDeleteModalClose) {
    axios.post(server_url + "/back/delete_team/", {
        teamname: currentClickTeam,
    }).then((res) => {
        if(res.data.chk_message) {
            alert(currentClickTeam + " 팀이 삭제되었습니다.");
            handleTeamDeleteModalClose();
            navigate("/team");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamDelete;