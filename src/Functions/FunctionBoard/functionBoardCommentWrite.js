import axios from "axios";
import server_url from "../../serverUrl.js";

function functionBoardCommentWrite(userID, boardID, commentRef, setCommentInfo) {
    //댓글 작성 시 작성된 값을 백엔드로 전송하기 위한 코드이다.
    axios.post(server_url + "/back/write_comment/", {
        id: userID,
        boardID: boardID,
        comment: commentRef.current.value,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        alert("댓글이 작성되었습니다. (+1p)");
        setCommentInfo(res.data.comment_data);
        commentRef.current.value = "";
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardCommentWrite;