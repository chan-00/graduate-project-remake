import axios from "axios";

function functionBoardCommentModify(currentClickBoardID, modifyState, commentRef, setCommentInfo, setModifyState) {
    //댓글 수정 시 수정된 값을 백엔드로 전송하기 위한 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/comment_change/", {
        commentID: modifyState,
        boardID: currentClickBoardID,
        comment: commentRef.current.value,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        alert("댓글이 수정되었습니다.");
        setCommentInfo(res.data.comment_data);
        setModifyState("");
        commentRef.current.value = "";
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardCommentModify;