import axios from "axios";
import server_url from "../../serverUrl.js";

//아이디값을 백엔드로 보내고, 중복 여부를 확인하여 화면에 띄울 메시지값(setIdCheckMessage)과 버튼의 활성화 여부값(setSignBtnActivation)을 변경한다.
function functionEmailAuth(emailRef, setRandEmailAuthNumber, setEmailAuthInputShow) {
    //이메일 인증 전 정규식 표현에 맞는 이메일 값인지 확인한다.
    const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailPattern.test(emailRef.current.value)) {
        alert("현재 입력한 이메일 값에 특수문자, 공백이 포함되어 있습니다.");
        emailRef.current.focus();
        return false;
    }

    //백엔드에 사용자가 입력한 이메일 값을 전송하여, 해당 이메일로 발신되는 랜덤 숫자값을 받아 변수에 저장한다.
    axios.post(server_url + "/back/send_mail/", {
        email: emailRef.current.value
    }).then((res) => {
        if(res.data.sucess_message) {
            setRandEmailAuthNumber(res.data.sucess_message);
            setEmailAuthInputShow(true);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionEmailAuth;