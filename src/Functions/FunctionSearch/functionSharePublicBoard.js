import axios from "axios";
import server_ip from "../../serverIP.js";

function functionSharePublicBoard(userID, title, contents, category, handleSearchShareModalClose) {
    //팀 구인 게시판 글 작성 시 백엔드로부터 팀 리스트를 받아 오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/post_info_share/", {
        id: userID,
        category: category,
        contents: contents,
        title: title
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.post_data === "작성이 완료되었습니다!") {
            alert("공유가 완료되었습니다.");
            handleSearchShareModalClose();
        }
        
    }).catch((err) => {
        console.log(err);
    })
}

export default functionSharePublicBoard;