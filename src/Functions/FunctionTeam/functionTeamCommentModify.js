import axios from "axios";
import server_url from "../../serverUrl.js";

function functionTeamCommentModify(newCommentRef, currentClickTeam, setTeamComment, handleTeamCommentModifyModalClose) {
    axios.post(server_url + "/back/ch_comment/", {
        teamname: currentClickTeam,
        teamcomment: newCommentRef.current.value,
    }).then((res) => {
        alert("코멘트가 성공적으로 수정되었습니다!");
        setTeamComment(newCommentRef.current.value);
        handleTeamCommentModifyModalClose();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamCommentModify;