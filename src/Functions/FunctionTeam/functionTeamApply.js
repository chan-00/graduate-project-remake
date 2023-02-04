import axios from "axios";

function functionTeamApply(id, currentClickTeam) {
    axios.post("http://" + process.env.server_ip + ":8000/back/team_apply/", {
        id: id,
        teamname: currentClickTeam,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.message === "해당 팀에 현재 남은 자리가 없습니다!") {
            alert("해당 팀에 현재 남은 자리가 없습니다.");
        }
        else if(res.data.message === "팀 신청이 완료되었습니다.") {
            alert("팀 신청이 완료되었습니다.");
        }
        else if(res.data.message === "해당 팀은 이미 신청한 기록이 있습니다!") {
            alert("해당 팀은 이미 신청한 기록이 있습니다.");
        }
        //alert(currentClickTeam + " 팀에 신청하였습니다!");
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamApply;