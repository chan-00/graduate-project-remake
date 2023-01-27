import axios from "axios";
import server_ip from "../../serverIP";

function functionTeamMake(idValue, teamnameRef, teamDescRef, teamCategory, navigate) {
    axios.post("http://" + server_ip + ":8000/back/make_team/", {
        id: idValue,
        teamname: teamnameRef.current.value,
        teamdesc: teamDescRef.current.value,
        teamcategory: teamCategory
    }).then((res) => {
        if(res.data.chk_message === "팀 생성이 완료되었습니다.") {
            alert(res.data.chk_message);
            navigate("/team");
        }
        else if(res.data.chk_message === "팀 이름이 중복입니다.") {
            alert("이미 해당 팀명으로 팀이 만들어져 있습니다.");
            teamnameRef.current.focus();
        }
        else if(res.data.chk_message === "사용 할 수 없는 팀 이름입니다.") {
            alert("사용 할 수 없는 팀 이름입니다.(Team, Question, Share, list-group-item)");
            teamnameRef.current.focus();
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamMake;