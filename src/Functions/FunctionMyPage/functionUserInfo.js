import axios from "axios";
import server_ip from "../../serverIP.js";

function functionUserInfo(idValue, setUserEmail, setUserComments, setUserTeamArray, setLoadingStatus, setProfileImage) {
    //마이페이지 첫 렌더링 시 해당 유저의 이메일 값과 유저 코멘트 값을 받아오기 위한 post 코드이다.
    axios.post("http://" + server_ip + ":8000/back/mypage/", {
        id: idValue,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        const { team_data } = res.data;
        console.log(res);

        setProfileImage(res.data.post_data);
        setUserEmail(res.data.user_data[0][0]);
        setUserComments(res.data.user_data[0][1]);
        setUserTeamArray(team_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionUserInfo;