import axios from "axios";
import server_url from "../../serverUrl.js";

function functionDeleteLetterListItem(userID, messageID, setLetterArray) {
    //쪽지함에서 특정 쪽지 메시지 삭제 버튼 클릭 시 백엔드에 삭제 요청을 보내는 코드이다.
    axios.post(server_url + "/back/delete_message/", {
        id: userID,
        message_id: messageID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        alert("해당 메시지가 삭제했습니다.");
        setLetterArray(res.data.message_list);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionDeleteLetterListItem;