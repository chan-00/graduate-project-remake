import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetLetterList(userID, setLetterArray) {
    //쪽지함이 처음 렌더링될 때 백엔드로부터 쪽지 리스트를 요청하는 코드이다.
    axios.post(server_url + "/back/messege_list/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        console.log(res);
        setLetterArray(res.data.message_list);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetLetterList;