import axios from "axios";

function functionTeamBoardFileDownload(currentClickTeamBoardID, setDownloadUrl, downloadUrl) {
    //전송하는 키값을 맞추기 위해서 전송할 임시 객체를 구성한다.
    const sendObj = {post_id: currentClickTeamBoardID};

    //첨부 파일 영역 클릭 시 백엔드로부터 해당 파일에 대한 데이터를 받아 오는 코드이다.
    axios({
        url: "http://" + process.env.server_ip + ":8000/back/download_file/", // 파일 다운로드 요청 URL
        method: "POST", // 혹은 'POST'
        responseType: "blob", // 응답 데이터 타입 정의,
        data: sendObj,
    }).then((res) => {
        if(downloadUrl.length !== 0) {
            window.URL.revokeObjectURL(downloadUrl);
        }
        const url = window.URL.createObjectURL(res.data);
        setDownloadUrl(url);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamBoardFileDownload;