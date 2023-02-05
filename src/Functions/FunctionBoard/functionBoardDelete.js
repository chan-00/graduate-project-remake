import axios from "axios";
import server_url from "../../serverUrl.js";

function functionBoardDelete(currentClickBoardID, navigate) {
    //댓글 작성 시 작성된 값을 백엔드로 전송하기 위한 코드이다.
    axios.post(server_url + "/back/post_delete/", {
        post_id: currentClickBoardID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.chk_message === "게시글이 삭제되었습니다!") {
            alert("게시글이 삭제되었습니다!");
            if(window.sessionStorage.category === "Team") {
                navigate("/offerboard");
            }
            else if(window.sessionStorage.category === "Question") {
                navigate("/questionboard");
            }
            else if(window.sessionStorage.category === "Share") {
                navigate("/shareboard");
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardDelete;