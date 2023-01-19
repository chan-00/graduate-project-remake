import axios from "axios";
import server_ip from "../../serverIP.js";

function functionApplyReject(nickname, setTeamApplyArray, currentClickTeam) {
    //팀 상세 페이지 첫 렌더링 시 그 팀에 대한 정보와 해당 계정이 팀에 속해 있는지에 대한 여부 값을 받아오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/reject_apply/", {
        teamname: currentClickTeam,
        nickname: nickname,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.message === "신청을 거절했습니다!") {
            alert("승인 거부 처리되었습니다.");
            setTeamApplyArray(res.data.apply_list);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionApplyReject;