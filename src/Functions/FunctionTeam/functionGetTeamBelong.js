import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetTeamBelong(idValue, currentClickTeam, setTeamBelong, setLoadingStatus) {
    //팀 상세 페이지 첫 렌더링 시 그 팀에 대한 정보와 해당 계정이 팀에 속해 있는지에 대한 여부 값을 받아오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/team_authority/", {
        id: idValue,
        teamname: currentClickTeam
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        //비로그인 상태거나 팀에 소속된 계정이 아니면 -1, 팀에 소속되어 있으나 팀장이 아니면 0, 팀장이라면 1 값을 반환한다.
        //위의 값을 teamBelong useState 변수에 저장하게 된다.
        setTeamBelong(res.data.data[0]);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetTeamBelong;