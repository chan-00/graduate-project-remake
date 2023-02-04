import axios from "axios";

function functionBoardModify(category, teamname, contentsRef, titleRef, navigate, currentClickBoardID) {
    //팀 구인 게시판 글 수정 시 백엔드에게 작성한 글 내용을 전송하는 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/post_change/", {
        post_id: currentClickBoardID,
        text: contentsRef.current.value,
        title: titleRef.current.value,
        category: category,
        teamname: teamname,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.chk_message === "게시글이 수정되었습니다.") {
            alert("게시글 수정이 완료되었습니다!");
            navigate("/boarddetail");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionBoardModify;