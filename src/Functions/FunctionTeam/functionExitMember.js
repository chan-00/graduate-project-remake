import axios from "axios";

function functionExitMember(nickname, currentClickTeam, setTeamMemberArray, setUserProfileInfo) {
    //팀 상세 페이지 첫 렌더링 시 그 팀에 대한 정보와 해당 계정이 팀에 속해 있는지에 대한 여부 값을 받아오는 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/delete_TU/", {
        teamname: currentClickTeam,
        nickname: nickname
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.chk_message === "해당 팀원이 추방되었습니다!") {
            alert("해당 팀원이 추방되었습니다!");
            setUserProfileInfo(res.data.team_photo);
            setTeamMemberArray(res.data.datas);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionExitMember;