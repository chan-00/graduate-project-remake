import axios from "axios";
import server_ip from "../../serverIP";

function functionCommentsModify(idValue, newCommentsRef, handleCommentsModifyModalClose, setUserComments) {
    axios.post("http://" + server_ip + ":8000/back/comment_ch/", {
        id: idValue,
        comment: newCommentsRef.current.value,
    }).then((res) => {
        alert("코멘트가 성공적으로 수정되었습니다!");
        setUserComments(newCommentsRef.current.value);
        handleCommentsModifyModalClose();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionCommentsModify;