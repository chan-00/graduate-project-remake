import axios from "axios";
import server_url from "../../serverUrl.js";

function functionCommentsModify(idValue, newCommentsRef, handleCommentsModifyModalClose, setUserComments) {
    //글자 수 제한과 관련된 조건문 코드이다.
    if(newCommentsRef.current.value.length === 0 || newCommentsRef.current.value.length > 400) {
        alert("코멘트를 입력하지 않았거나 400글자 이상 입력하였습니다.");
        newCommentsRef.current.focus();
        return false;
    }

    axios.post(server_url + "/back/comment_ch/", {
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