import axios from "axios";
import server_url from "../../serverUrl.js";

function functionUserPoint(id, setUserPoint, setLoadingStatus) {
    axios.post(server_url + "/back/before_buy/", {
        id: id,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserPoint(parseInt(res.data.have_point));
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionUserPoint;