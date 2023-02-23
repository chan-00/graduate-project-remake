import axios from "axios";
import server_url from "../../serverUrl.js";

//아이디값을 백엔드로 보내고, 중복 여부를 확인하여 화면에 띄울 메시지값(setIdCheckMessage)과 버튼의 활성화 여부값(setSignBtnActivation)을 변경한다.
function functionAccountAuth(idRef, emailRef, navigate) {
    //계정 인증 전 사용자가 입력한 아이디 값과 이메일 값이 양식에 맞는지 검사하는 코드이다.
    const idPattern = /^[a-zA-Zㄱ-힣0-9][a-zA-Zㄱ-힣0-9]*$/;
    if(!idPattern.test(idRef.current.value)) {
        alert("현재 입력한 아이디 값에 특수문자 혹은 공백이 포함되어 있습니다.");
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailPattern.test(emailRef.current.value)) {
        alert("현재 입력한 이메일 값에 특수문자, 공백이 포함되어 있습니다.");
        emailRef.current.focus();
        return false;
    }

    //백엔드에 사용자가 입력한 아이디, 이메일 값을 전송하여 백엔드에서 그 둘이 계정 정보와 일치하는지 검사 후, 일치한다면 해당 이메일에 인증 번호 발송 후 그 값을 반환해준다.
    axios.post(server_url + "/back/find_pw/", {
        id: idRef.current.value,
        email: emailRef.current.value
    }).then((res) => {
        if(res.data.return_message === "입력된 정보 중 아이디 혹은 이메일이 잘못됬습니다.") {
            alert("입력된 정보 중 아이디 혹은 이메일이 잘못되었습니다.");
            idRef.current.focus();
        }
        else {
            alert("계정 인증이 완료되었습니다.");
            window.sessionStorage.setItem("pwModifyAuthNumber", res.data.return_message);
            navigate("/pwmodify");
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionAccountAuth;