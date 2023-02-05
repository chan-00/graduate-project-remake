import axios from "axios";
import server_url from "../../serverUrl.js";

function functionShareUserTeamList(userID, setUserTeamList, handleSearchShareModalClose) {
    //자료 검색 화면에서 팀 공유 클릭 시 해당 유저의 팀 리스트를 받아 오는 코드이다.
    axios.post(server_url + "/back/write_post_button/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.team_list.length === 0) {
            alert("가입된 팀이 없습니다!");
            handleSearchShareModalClose();
        }
        else if(res.data.team_list.length !== 0) {
            setUserTeamList(res.data.team_list);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionShareUserTeamList;