import axios from "axios";

function functionTeamBoardWriteSubmit(category, teamname, userID, contentsRef, titleRef, navigate) {
    //팀 구인 게시판 글 작성 시 백엔드에게 작성한 글 내용을 전송하는 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/write_post/", {
        id: userID,
        category: category,
        teamname: teamname,
        contents: contentsRef.current.value,
        title: titleRef.current.value,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.post_data === "작성이 완료되었습니다!") {
            alert("게시글 작성이 완료되었습니다!");
            if(category === "Team") {
                navigate("/offerboard");
            }
            else if(category === "Question") {
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

export default functionTeamBoardWriteSubmit;