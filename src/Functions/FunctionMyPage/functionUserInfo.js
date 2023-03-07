import axios from "axios";
import server_url from "../../serverUrl.js";

function functionUserInfo(idValue, setUserEmail, setUserComments, setUserTeamArray, setLoadingStatus, setProfileImage, setCountData, setUserPoint) {
    //마이페이지 첫 렌더링 시 해당 유저의 이메일 값과 유저 코멘트 값을 받아오기 위한 post 코드이다.
    axios.post(server_url + "/back/mypage/", {
        id: idValue,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        console.log(res);
        const { team_data } = res.data;

        setProfileImage(res.data.post_data);
        setUserEmail(res.data.user_data[0][0]);
        setUserComments(res.data.user_data[0][1]);
        setUserPoint(res.data.user_data[0][2]);
        setUserTeamArray(team_data);
        setCountData(res.data.count_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionUserInfo;