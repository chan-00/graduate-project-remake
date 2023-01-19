import axios from "axios";
import server_ip from "../../serverIP.js";

function functionSignUp(idRef, pwRef, pwCheckRef, emailRef, nicknameRef, navigate, setNickname) {
    //사용자가 입력한 아이디, 비밀번호, 닉네임 값이 특정 문자 개수 이상 넘길 수 있도록 제한한다.
    if(idRef.current.value.length < 4) {
        alert("id를 4글자 이상 입력하세요.");
        idRef.current.focus();
        return false;
    }
    if(pwRef.current.value.length < 7) {
        alert("비밀번호를 7글자 이상 입력하세요.");
        pwRef.current.value = "";
        pwRef.current.focus();
        return false;
    }
    if(nicknameRef.current.value.length < 4) {
        alert("닉네임을 4글자 이상 입력하세요.");
        nicknameRef.current.focus();
        return false;
    }

    //비밀번호와 비밀번호 체크 값이 같은지 확인하여 같으면 axios로 서버에 값을 보낸다.
    if(pwRef.current.value === pwCheckRef.current.value) {
        //axios post 방식으로 서버 url에 signup 요청을 보낸다.(입력한 값도 같이 보냄)
        axios.post("http://" + server_ip + ":8000/back/regist/", {
            id: idRef.current.value,
            pw: pwRef.current.value,
            email: emailRef.current.value,
            nickname: nicknameRef.current.value
        }).then((res) => {
            //백에서 성공적으로 처리되었을 때 then 함수 안으로 들어오게 된다.
            //백엔드로부터 받은 데이터를 if 조건문으로 구분하여 상황에 맞는 코드를 쓴다.
            //아이디/닉네임 중복이라는 데이터 받을 때 alert 창으로 알려 준다.
            if(res.data.chk_message === "아이디 중복입니다.") {
                alert("아이디의 중복 여부를 다시 확인해주세요.");
                idRef.current.focus();
            }
            else if(res.data.chk_message === "닉네임 중복입니다.") {
                alert("이미 존재하는 닉네임입니다.");
                nicknameRef.current.focus();
            }
            else if(res.data.chk_message === "이메일 중복입니다.") {
                alert("이미 존재하는 이메일입니다.");
                emailRef.current.focus();
            }
            //위의 두 조건에 걸리지 않는다면 회원가입 성공 메시지를 띄우고 session storage에 id 값을 부여한다.
            else {
                alert("회원가입 성공!");
                window.sessionStorage.setItem("id", idRef.current.value);
                window.sessionStorage.setItem("nickname", nicknameRef.current.value);
                setNickname(nicknameRef.current.value);
                navigate("/");
            }
        }).catch((err) => {
            console.log(err);
        })
    } else {
        //else 문으로 들어왔다는 것은 비밀번호와 재확인 값이 같지 않은 경우므로 에러 메시지를 띄운다.
        alert("비밀번호와 비밀번호 재확인 값이 같지 않습니다.");
        pwCheckRef.current.focus();
    }
}

export default functionSignUp;