import axios from "axios";
import server_url from "../../serverUrl.js";

function functionShareTeamBoard(userID, title, contents, teamname, handleSearchShareModalClose, navigate) {
    //자료 검색 화면에서 팀 공유 클릭 시 해당 유저의 팀 리스트를 받아 오는 코드이다.
    axios.post(server_url + "/back/team_info_share/", {
        id: userID,
        title: title,
        contents: contents,
        teamname: teamname,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.post_data === "작성이 완료되었습니다!") {
            alert("공유가 완료되었습니다. (+2p)");
            window.sessionStorage.setItem("currentClickTeam", teamname);
            window.sessionStorage.setItem("teamSelectMenuValue", "TeamBoard");
            navigate("/teaminfo");
        }
        handleSearchShareModalClose();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionShareTeamBoard;