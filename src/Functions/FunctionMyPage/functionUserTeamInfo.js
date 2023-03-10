import axios from "axios";
import server_url from "../../serverUrl.js";

function functionUserTeamInfo(userTeamName, setUserTeamInfoArray, setUserProfileInfo) {
    //마이페이지 첫 렌더링 시 해당 유저의 이메일 값과 유저 코멘트 값을 받아오기 위한 post 코드이다.
    axios.post(server_url + "/back/mypage_TUlist/", {
        teamname: userTeamName,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserTeamInfoArray(res.data.user_data);
        setUserProfileInfo(res.data.photo_data);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionUserTeamInfo;