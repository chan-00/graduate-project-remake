import axios from "axios";
import server_ip from "../../serverIP.js";

function functionGetUnityChatLog(currentClickTeam, setChatLogArray, setLoadingStatus, setUserProfileInfo) {
    //채팅 로그 화면 첫 렌더링 시 백엔드로부터 유니티의 채팅 로그 기록을 받아 오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/team_chat/", {
        teamname: currentClickTeam,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.chat_list.length !== 0) {
            setLoadingStatus(true);
            setUserProfileInfo(res.data.photo_data);
            setChatLogArray(res.data.chat_list);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetUnityChatLog;