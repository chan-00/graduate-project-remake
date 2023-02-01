import axios from "axios";
import server_ip from "../../serverIP.js";

function functionTeamBoardWrite(title, contents, id, teamname, setSelectedMenu, category) {
    //팀 게시판에서 게시글 작성 시 백엔드와 통신하는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/write_team_post/", {
        title: title,
        contents: contents,
        id: id,
        teamname: teamname,
        post_type: category,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.message === "게시글 작성이 완료되었습니다!") {
            alert(res.data.message);
            setSelectedMenu("TeamBoard");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardWrite;