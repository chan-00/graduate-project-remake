import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetTeamBoardInfo(boardID, setTeamBoardInfo, setLoadingStatus) {
    //팀 게시글에서 수정 버튼 클릭 시 기존 게시글의 정보를 백엔드로부터 받아 오는 코드이다.
    axios.post(server_url + "/back/modify_team_post_button/", {
        post_id: boardID
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setTeamBoardInfo(res.data.post_data[0]);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetTeamBoardInfo;