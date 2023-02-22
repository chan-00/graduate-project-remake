import axios from "axios";
import server_url from "../../serverUrl.js";

//로그인 이벤트 발생 시 호출되는 함수로, 로그인 창에 입력한 id와 pw 값을 갖고 DB에 select 문을 요청하는 로그인 함수이다.
function functionIdSearch(emailRef, setSearchId) {
    //이메일 인증 전 입력한 이메일의 양식을 확인하는 절차
    const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailPattern.test(emailRef.current.value)) {
        alert("현재 입력한 이메일 값에 특수문자, 공백이 포함되어 있습니다.");
        emailRef.current.focus();
        return false;
    }
    
    axios.post(server_url + "/back/find_id/", {
        email: emailRef.current.value,
    }).then((res) => {
        if(res.data.id_message === "입력하신 이메일이 맞는 아이디가 없습니다.") {
            alert("입력하신 이메일이 맞는 아이디가 없습니다.");
            setSearchId("");
        }
        else if(res.data.id_message !== "입력하신 이메일이 맞는 아이디가 없습니다.") {
            setSearchId(res.data.id_message);
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionIdSearch;