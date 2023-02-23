import axios from "axios";
import server_url from "../../serverUrl.js";

function functionWithDrawal(idValue, navigate, setNickname, handleWidhDrawalModifyModalClose) {
    //회원탈퇴 버튼 클릭 시 백엔드에 회원 탈퇴를 요청하는 코드이다.
    axios.post(server_url + "/back/Withdrawal/", {
        id: idValue,
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        if(res.data.return_data === "회원탈퇴가 완료 되었습니다!") {
            handleWidhDrawalModifyModalClose();
            window.sessionStorage.clear();
            setNickname("");
            alert("회원 탈퇴되었습니다!");
            navigate("/");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionWithDrawal;