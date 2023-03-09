import axios from "axios";
import server_url from "../../serverUrl.js";

function functionGetAccountItemList(userID, setUserItemList) {
    //상품 보관함 페이지 첫 렌더링 시 해당 유저의 아이템 정보를 받아 오는 코드이다. 
    axios.post(server_url + "/back/item_list/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserItemList(res.data.item_list);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetAccountItemList;