import axios from "axios";
import server_ip from "../../serverIP.js";

function functionTeamBoardDetailInfo(currentClickTeamBoardID, setTeamBoardInfo, setLoadingStatus, setShareFileName) {
    //팀 게시글 페이지 첫 렌더링 시 게시글의 정보를 받아 오는 코드이다.
    axios.post("http://" + server_ip + ":8000/back/team_post/", {
        id: currentClickTeamBoardID
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.file_name) {
            setShareFileName(res.data.file_name);
        }
        setTeamBoardInfo(res.data.post_data[0]);
        setLoadingStatus(true);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardDetailInfo;