import axios from "axios";
import server_url from "../../serverUrl.js";

function functionSecession(id, currentClickTeam, nickname, navigate) {
    //탈퇴 버튼 클릭 시 백엔드에 해당 계정의 해당 팀 탈퇴 요청을 보내는 코드이다.
    axios.post(server_url + "/back/withdraw_team/", {
        id: id,
        teamname: currentClickTeam,
        nickname: nickname,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.return_data === "팀에서 탈퇴했습니다!") {
            alert(currentClickTeam + " 팀에서 탈퇴했습니다!");
            navigate("/team");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionSecession;