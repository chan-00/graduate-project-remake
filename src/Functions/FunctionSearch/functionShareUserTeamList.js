import axios from "axios";
import server_ip from "../../serverIP.js";

function functionShareUserTeamList(userID, setUserTeamList, setSearchShareModalShow) {
    //팀 구인 게시판 글 작성 시 백엔드로부터 팀 리스트를 받아 오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/write_post_button/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.team_list.length === 0) {
            alert("가입된 팀이 없습니다!");
        }
        else if(res.data.team_list.length !== 0) {
            setUserTeamList(res.data.team_list);
            setSearchShareModalShow(true);
        }
        
    }).catch((err) => {
        console.log(err);
    })
}

export default functionShareUserTeamList;