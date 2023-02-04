import axios from "axios";
import server_ip from "../../serverIP";

//닉네임 수정과 관련되어 백엔드와 통신하는 함수이다.
function functionNicknameModify(idValue, newNicknameRef, handleNicknameModifyModalClose, setNickname) {
    //입력 길이에 제한을 거는 조건문 코드이다.
    if(newNicknameRef.current.value.length < 4) {
        alert("닉네임을 4글자 이상 입력하세요.");
        newNicknameRef.current.focus();
        return false;
    }
    else if(newNicknameRef.current.value.length === 0 || newNicknameRef.current.value.length > 20) {
        alert("닉네임을 입력하지 않았거나 글자 수가 20글자 초과입니다.");
        newNicknameRef.current.focus();
        return false;
    }

    //입력에 제한을 거는 정규 표현식 코드이다.
    const nicknamePattern = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣]*$/;
    if(!nicknamePattern.test(newNicknameRef.current.value)) {
        alert("현재 입력한 닉네임 값에 특수문자, 공백이 포함되어 있습니다.");
        newNicknameRef.current.focus();
        return false;
    }

    axios.post("http://" + server_ip + ":8000/back/name_ch/", {
        id: idValue,
        nickname: newNicknameRef.current.value,
    }).then((res) => {
        if(res.data.chk_message === "닉네임 중복입니다.") {
            alert("이미 존재하는 닉네임입니다.");
            newNicknameRef.current.focus();
        }
        else if(res.data.chk_message === "닉네임이 변경되었습니다.") {
            alert("닉네임이 성공적으로 바뀌었습니다!");
            window.sessionStorage.setItem("nickname", newNicknameRef.current.value);
            setNickname(newNicknameRef.current.value);
            handleNicknameModifyModalClose();
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionNicknameModify;