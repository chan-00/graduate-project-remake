import axios from "axios";
import server_url from "../../serverUrl.js";

//랜덤박스 제외 물품 구매 시 호출되는 함수
function functionPurchase(itemCost, id, itemId, itemCategory, navigate) {
    axios.post(server_url + "/back/buy_item/", {
        item_cost: itemCost,
        id: id,
        item_id: itemId,
        item_category: itemCategory,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.return_message === "이미 보유중인 아이탬입니다!") {
            alert("이미 보유 중인 아이템입니다!");
        }
        else if(res.data.return_message === "구매 완료!") {
            alert("구매 완료!");
            navigate("/shop");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionPurchase;