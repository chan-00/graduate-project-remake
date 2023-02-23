//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react router
import { Link, useNavigate } from "react-router-dom"
//import react hooks
import { useRef, useState, useEffect } from "react";
//import functions
import functionIdSearch from "../../Functions/FunctionSign/functionIdSearch";

function IdSearch() {
    //ref 변수들 선언
    const emailRef = useRef();

    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //백엔드로부터 이메일에 맞는 아이디 값을 받아와서 저장할 useState 변수
    const [ searchId, setSearchId ] = useState("");

    //페이지 처음 렌더링 시 사용자가 이미 로그인한 상태에서 비정상적인 접근(url 접근 등....)을 했는지에 대한 체크를 위한 useEffect
    useEffect(() => {
        if(window.sessionStorage.id) {
            alert("이미 로그인한 상태입니다.");
            navigate("/");
        }
    }, []);

    //이메일 인증 버튼 클릭 시 호출되는 이벤트 함수
    const handleEmailAuth = (e) => {
        e.preventDefault();
        if(emailRef.current.value.length > 30 || emailRef.current.value.length === 0) {
            alert("이메일이 30글자 이상이거나 입력하지 않았습니다.");
        }
        else {
            functionIdSearch(emailRef, setSearchId);
        }
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handleEmailAuth}>
                <h2>서일대 아이디 찾기</h2>
                <hr></hr>
                <div id="emailInputContainer">
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        ref={emailRef}
                        maxLength="30"
                        autoFocus
                        required
                        className="formElements inputElements"
                    />
                    <Button type="submit" variant="outline-primary" className="formElements" style={{width:"37%", marginBottom:"5px" ,height:"42px", fontSize:"14px"}}>이메일 인증</Button>
                </div>
                {searchId.length !== 0 ? 
                <div>
                    <span style={{fontSize:"14px"}}>해당 이메일 계정의 아이디 : {searchId}</span>
                </div> : null}
                <hr></hr>
                <div>
                    <span style={{fontSize:"14px"}}>비밀번호를 잊어버리셨나요? <Link to="/pwsearch">비밀번호 찾기</Link></span><br/>
                    <span style={{fontSize:"14px"}}>서일대가 처음이신가요? <Link to="/signup">회원가입</Link></span>
                </div>
            </form>
        </div>
    )
}

export default IdSearch;