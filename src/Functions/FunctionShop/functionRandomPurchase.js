import axios from "axios";
import server_url from "../../serverUrl.js";

//랜덤박스를 통해 물품 휙득 시 호출되는 이벤트 함수
function functionRandomPurchase(id, itemId, itemCategory, setResultMessage, handleRandomResultModalShow, setUserPoint) {
    axios.post(server_url + "/back/buy_randombox/", {
        id: id,
        item_id: itemId,
        item_category: itemCategory,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.return_message) {
            setResultMessage("이미 보유 중인 아이템이므로 50p로 환전됩니다.");
            setUserPoint(res.data.return_point);
        }
        else {
            setResultMessage("");
            setUserPoint(res.data.return_point);
        }
        handleRandomResultModalShow();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionRandomPurchase;