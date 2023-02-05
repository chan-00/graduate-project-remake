import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetTeamInfoList(setUserTeamInfoList, idValue, setLoadingStatus, setUserProfileInfo) {
    //팀 페이지 첫 렌더링 시 해당 계정이 속한 팀의 리스트 값을 받아오기 위한 코드이다.
    axios.post(server_url + "/back/detail_team_list/", {
        id: idValue,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserTeamInfoList(res.data.user_data);
        setUserProfileInfo(res.data.photo_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetTeamInfoList;