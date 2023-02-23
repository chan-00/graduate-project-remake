import axios from "axios";
import server_url from "../../serverUrl.js";

function functionNewPwdModify(idValue, pwRef, navigate) {
    //글자 수 제한과 관련된 조건문 코드이다.
    if(pwRef.current.value.length < 7) {
        alert("비밀번호를 7글자 이상 입력하세요.");
        pwRef.current.value = "";
        pwRef.current.focus();
        return false;
    }
    else if(pwRef.current.value.length === 0 || pwRef.current.value.length > 20) {
        alert("비밀번호를 입력하지 않았거나 20글자 이상 입력하였습니다.");
        pwRef.current.value = "";
        pwRef.current.focus();
        return false;
    }

    //비밀번호 입력 규칙과 관련된 정규 표현식 코드이다.
    const pwPattern = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣\!0-9]*$/;
    if(!pwPattern.test(pwRef.current.value)) {
        alert("현재 입력한 비밀번호 값에 !를 제외한 특수문자 혹은 공백이 포함되어 있습니다.");
        pwRef.current.value = "";
        pwRef.current.focus();
        return false;
    }

    axios.post(server_url + "/back/pass_ch/", {
        id: idValue,
        pw: pwRef.current.value
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

export default functionNewPwdModify;