import axios from "axios";

function functionGetMyBoardList(userID, handleBoardListModifyModalShow, setUserBoardList) {
    //마이페이지 첫 렌더링 시 해당 유저의 이메일 값과 유저 코멘트 값을 받아오기 위한 post 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/list_of_my_post/", {
        id: userID,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        setUserBoardList(res.data.post_list);
        handleBoardListModifyModalShow();
    }).catch((err) => {
        console.log(err);
    })
}

export default functionGetMyBoardList;