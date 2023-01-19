import axios from "axios";
import server_ip from "../../serverIP";

function functionEmailModify(idValue, newEmailRef, handleEmailModifyModalClose, setUserEmail) {
    axios.post("http://" + server_ip + ":8000/back/email_ch/", {
        id: idValue,
        email: newEmailRef.current.value,
    }).then((res) => {
        if(res.data.chk_message === "이메일 중복입니다.") {
            alert("이미 존재하는 이메일입니다.");
            newEmailRef.current.focus();
        }
        else if(res.data.chk_message === "이메일이 변경되었습니다.") {
            alert("이메일이 성공적으로 바뀌었습니다!");
            setUserEmail(newEmailRef.current.value);
            handleEmailModifyModalClose();
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionEmailModify;