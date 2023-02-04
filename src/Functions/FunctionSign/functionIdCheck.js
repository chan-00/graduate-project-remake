import axios from "axios";

//아이디값을 백엔드로 보내고, 중복 여부를 확인하여 화면에 띄울 메시지값(setIdCheckMessage)과 버튼의 활성화 여부값(setSignBtnActivation)을 변경한다.
function functionIdCheck(idRef, setIdCheckMessage, setSignBtnActivation) {
    //아이디 중복 여부 확인 전 정규식 표현에 맞는 아이디 값인지 확인한다.
    const strPattern = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣]*$/;
    if(!strPattern.test(idRef.current.value)) {
        alert("현재 입력한 아이디 값에 특수문자 혹은 공백이 포함되어 있습니다.");
        return false;
    }

    //백엔드에 현재 사용자가 입력한 id 값을 전송한다.
    axios.post("http://" + process.env.server_ip + ":8000/back/id_chk/", {
        id: idRef.current.value
    }).then((res) => {
        //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
        //res.data.chk_message 데이터에 백엔드로부터 온 아이디 중복 판단 여부 메시지값이 들어 있다.
        //메시지를 if 조건문으로 구분하여 동작을 다르게 한다.
        if(res.data.chk_message === "사용 가능한 아이디입니다.") {
            setIdCheckMessage(res.data.chk_message);
            setSignBtnActivation(false);
        } 
        else if(res.data.chk_message === "아이디 중복입니다.") {
            setIdCheckMessage(res.data.chk_message);
            setSignBtnActivation(true);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionIdCheck;