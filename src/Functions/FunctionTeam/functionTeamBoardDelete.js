import axios from "axios";
import server_ip from "../../serverIP.js";

function functionTeamBoardDelete(currentClickTeamBoardID, handleTeamBoard) {
    //팀 게시글 삭제 시 백엔드와 통신하는 코드이다.
    /*
    axios.post("http://" + server_ip + ":8000/back/post_delete/", {
        post_id: currentClickBoardID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        alert("게시글이 삭제되었습니다!");
        handleTeamBoard();
    }).catch((err) => {
        console.log(err);
    })
    */
}

export default functionTeamBoardDelete;