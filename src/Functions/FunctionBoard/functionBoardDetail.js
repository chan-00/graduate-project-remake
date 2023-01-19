import axios from "axios";
import server_ip from "../../serverIP.js";

function functionBoardDetail(currentClickBoardID, setBoardInfo, setCommentInfo, setLoadingStatus) {
    //게시글 첫 렌더링 시 해당 게시글의 데이터 정보를 받아오기 위한 코드이다.
    axios.post("http://" + server_ip + ":8000/back/the_post/", {
        post_id: currentClickBoardID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setBoardInfo(res.data.post_data[0]);
        setCommentInfo(res.data.comment_data);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardDetail;