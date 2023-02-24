//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react router
import { Link, useNavigate } from "react-router-dom"
//import react hooks
import { useRef, useState, useEffect } from "react";
//import functions
import functionNewPwdModify from "../../Functions/FunctionModify/functionNewPwdModify";


function PwModify() {
    //입력 값을 알기 위한 useRef 변수들
    const emailAuthRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();

    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //이메일 인증 성공 여부를 담고 있는 boolean useState 변수
    const [ emailAuth, setEmailAuth ] = useState(false);

    //페이지 첫 렌더링 시 비정상적인 접근일 경우를 차단하기 위한 useEffect 함수
    useEffect(() => {
        if(!window.sessionStorage.pwModifyAuthNumber) {
            alert("비정상적인 접근입니다.");
            navigate("/");
        }
        return () => {
            window.sessionStorage.removeItem("pwModifyAuthNumber");
            window.sessionStorage.removeItem("checkId");
        }
    }, []);

    //이메일 인증 번호 확인 버튼 클릭 시 호출되는 이벤트 함수
    const handleAuthNumberCheck = () => {
        if(emailAuthRef.current.value === window.sessionStorage.pwModifyAuthNumber) {
            setEmailAuth(true);
        }
        else {
            setEmailAuth(false);
        }
    }

    //비밀번호 재설정 이벤트 발생 시 호출되는 이벤트 함수
    const handlePasswordModify = (e) => {
        e.preventDefault();
        if(pwRef.current.value === pwCheckRef.current.value) {
            functionNewPwdModify(window.sessionStorage.checkId, pwRef, navigate);
        }
        else {
            alert("비밀번호와 비밀번호 확인 값이 같지 않습니다.");
        }
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handlePasswordModify}>
                <h2>위드리움 비밀번호 재설정</h2>
                <hr></hr>
                <div id="emailInputContainer">
                    <input
                        type="text"
                        placeholder="인증 번호 입력"
                        ref={emailAuthRef}
                        maxLength="6"
                        required
                        className="formElements inputElements"
                    />
                    <Button variant="outline-primary" className="formElements" style={{width:"37%", marginBottom:"5px" ,height:"42px", fontSize:"14px"}} onClick={handleAuthNumberCheck}>인증 확인</Button>
                </div>
                {emailAuth ? 
                <div>
                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            ref={pwRef}
                            maxLength="20"
                            required
                            className="formElements inputElements"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호 확인"
                            ref={pwCheckRef}
                            maxLength="20"
                            required
                            className="formElements inputElements"
                        />
                    </div>
                    <div className="signButtonContainer">
                        <Button type="submit" variant="primary" className="formElements">계정 인증</Button>
                    </div>
                </div>
                : null}
                
                <hr></hr>
                <div>
                    <span style={{fontSize:"14px"}}>아이디를 잊어버리셨나요? <Link to="/idsearch">아이디 찾기</Link></span><br/>
                    <span style={{fontSize:"14px"}}>위드리움이 처음이신가요? <Link to="/signup">회원가입</Link></span>
                </div>
            </form>
        </div>
    );
}

export default PwModify;