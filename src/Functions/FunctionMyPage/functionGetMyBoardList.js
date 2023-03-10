import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetMyBoardList(userID, handleBoardListModifyModalShow, setUserBoardList) {
    axios.post(server_url + "/back/list_of_my_post/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserBoardList(res.data.post_list);
        handleBoardListModifyModalShow();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetMyBoardList;