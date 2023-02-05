import axios from "axios";
import server_url from "../../serverUrl.js";

function functionPwdModify(idValue, pwRef, newPwRef, handlePasswordModifyModalClose) {
    //글자 수 제한과 관련된 조건문 코드이다.
    if(newPwRef.current.value.length < 7) {
        alert("신규 비밀번호를 7글자 이상 입력하세요.");
        newPwRef.current.value = "";
        newPwRef.current.focus();
        return false;
    }
    else if(newPwRef.current.value.length === 0 || newPwRef.current.value.length > 20) {
        alert("신규 비밀번호를 입력하지 않았거나 20글자 이상 입력하였습니다.");
        newPwRef.current.value = "";
        newPwRef.current.focus();
        return false;
    }

    //비밀번호 입력 규칙과 관련된 정규 표현식 코드이다.
    const pwPattern = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣\!]*$/;
    if(!pwPattern.test(newPwRef.current.value)) {
        alert("현재 입력한 비밀번호 값에 !를 제외한 특수문자 혹은 공백이 포함되어 있습니다.");
        pwRef.current.value = "";
        pwRef.current.focus();
        return false;
    }

    axios.post(server_url + "/back/pass_ch/", {
        id: idValue,
        old_pw: pwRef.current.value,
        new_pw: newPwRef.current.value
    }).then((res) => {
        if(res.data.chk_message === "비밀번호가 틀렸습니다.") {
            alert("기존 비밀번호가 틀렸습니다.");
            pwRef.current.value = "";
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