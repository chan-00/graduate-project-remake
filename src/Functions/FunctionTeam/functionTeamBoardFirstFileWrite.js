import axios from "axios";

function functionTeamBoardFirstFileWrite(title, contents, id, teamname, setSelectedMenu, category, formData) {
    //팀 게시판에서 게시글 작성 시 백엔드와 통신하는 코드이다.
    axios.post("http://" + process.env.server_ip + ":8000/back/write_team_post/", {
        title: title,
        contents: contents,
        id: id,
        teamname: teamname,
        post_type: category,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.message === "게시글 작성이 완료되었습니다!") {
            //팀 게시판에서 게시글 작성 시 파일을 전송하는 코드이다.
            axios({
                url: "http://" + process.env.server_ip + ":8000/back/write_team_post_with_file/",
                data: formData,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if(res.data.message === "파일 업로드 성공") {
                    alert("게시글 작성이 완료되었습니다!");
                    setSelectedMenu("TeamBoard");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardFirstFileWrite;