import axios from "axios";
import server_ip from "../serverIP";

function functionDownloadUnityFile(setDownloadUrl, downloadUrl) {
    //메인 페이지에서 시작하기 버튼 클릭 시 백엔드로부터 해당 파일에 대한 데이터를 받아 오는 코드이다.
    axios({
        url: "http://" + server_ip + ":8000/back/main_file/", // 파일 다운로드 요청 URL
        method: "GET", // 혹은 'POST'
        responseType: "blob", // 응답 데이터 타입 정의,
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

export default functionDownloadUnityFile;