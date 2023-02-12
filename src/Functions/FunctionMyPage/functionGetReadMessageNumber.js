import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetReadMessageNumber(userID, setNotReadMessage, setLoadingStatus) {
    //헤더에서 닉네임 버튼 클릭 시 백엔드로부터 읽지 않은 메시지 개수 값을 받아오는 코드이다.
    axios.post(server_url + "/back/not_read/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setNotReadMessage(res.data.left_message);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetReadMessageNumber;