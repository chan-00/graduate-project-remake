import axios from "axios";
import server_url from "../../serverUrl.js";

function functionTeamBoardModify(boardTitle, postID, contents, setSelectedMenu) {
    //팀 게시글 수정 클릭 시 해당 게시글의 내용을 수정하도록 백엔드와 통신하는 코드이다.
    axios.post(server_url + "/back/modify_team_post/", {
        post_id: postID,
        title: boardTitle,
        text: contents,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.chk_message === "게시글이 수정되었습니다.") {
            alert(res.data.chk_message);
            setSelectedMenu("BoardDetail");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardModify;