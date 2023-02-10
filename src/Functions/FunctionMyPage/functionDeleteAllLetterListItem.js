import axios from "axios";
import server_url from "../../serverUrl.js";

function functionDeleteAllLetterListItem(userID, setLetterArray) {
    //쪽지함에서 전체 쪽지 메시지 삭제 버튼 클릭 시 백엔드에 삭제 요청을 보내는 코드이다.
    axios.post(server_url + "/back/delete_messages/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.message_message === "모든 메세지가 삭제되었습니다!") {
            alert("전체 메시지가 삭제했습니다.");
            setLetterArray([]);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionDeleteAllLetterListItem;