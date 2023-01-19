import axios from "axios";
import server_ip from "../../serverIP";

function functionPwdModify(idValue, pwRef, newPwRef, handlePasswordModifyModalClose) {
    axios.post("http://" + server_ip + ":8000/back/pass_ch/", {
        id: idValue,
        old_pw: pwRef.current.value,
        new_pw: newPwRef.current.value
    }).then((res) => {
        if(res.data.chk_message === "비밀번호가 틀렸습니다.") {
            alert("기존 비밀번호가 틀렸습니다.");
            pwRef.current.focus();
        }
        else if(res.data.chk_message === "비밀번호가 변경되었습니다.") {
            alert("비밀번호가 변경되었습니다.");
            handlePasswordModifyModalClose();
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionPwdModify;