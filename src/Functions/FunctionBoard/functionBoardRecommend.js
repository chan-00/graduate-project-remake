import axios from "axios";
import server_ip from "../../serverIP.js";

function functionBoardRecommend(currentClickBoardID, setBoardInfo, recommendNum) {
    //댓글 작성 시 작성된 값을 백엔드로 전송하기 위한 코드이다.
    axios.post("http://" + server_ip + ":8000/back/recommend/", {
        boardID: currentClickBoardID,
        recommendNum: recommendNum,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setBoardInfo(res.data.post_data[0]);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardRecommend;