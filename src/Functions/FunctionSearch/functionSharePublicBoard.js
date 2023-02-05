import axios from "axios";
import server_url from "../../serverUrl.js";

function functionSharePublicBoard(userID, title, contents, category, handleSearchShareModalClose, navigate) {
    //공용 게시판에 자료 검색 결과 공유 시 백엔드와 통신하는 코드이다.
    axios.post(server_url + "/back/post_info_share/", {
        id: userID,
        category: category,
        contents: contents,
        title: title
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.post_data === "작성이 완료되었습니다!") {
            //공유 성공 시 알림창을 띄우고 기존 Modal 창을 끈 다음, 카테고리에 맞게 해당 공용 게시판으로 화면을 이동시킨다.
            alert("공유가 완료되었습니다.");
            handleSearchShareModalClose();
            window.sessionStorage.setItem("category", category);
            if(category === "Question") {
                navigate("/questionboard");
            }
            else if(category === "Share") {
                navigate("/shareboard");
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionSharePublicBoard;