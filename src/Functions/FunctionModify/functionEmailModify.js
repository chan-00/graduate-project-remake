import axios from "axios";

function functionEmailModify(idValue, newEmailRef, handleEmailModifyModalClose, setUserEmail) {
    //입력 길이에 제한을 거는 조건문 코드이다.
    if(newEmailRef.current.value.length === 0 || newEmailRef.current.value.length > 30) {
        alert("이메일을 입력하지 않았거나 글자 수가 30글자 초과입니다.");
        newEmailRef.current.focus();
        return false;
    }

    //입력에 제한을 거는 정규 표현식 코드이다.
    const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailPattern.test(newEmailRef.current.value)) {
        alert("현재 입력한 이메일 값에 특수문자, 공백이 포함되어 있습니다.");
        newEmailRef.current.focus();
        return false;
    }

    axios.post("http://" + process.env.server_ip + ":8000/back/email_ch/", {
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