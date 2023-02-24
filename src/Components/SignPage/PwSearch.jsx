//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react router
import { Link, useNavigate } from "react-router-dom"
//import react hooks
import { useRef, useEffect } from "react";
//import functions
import functionAccountAuth from "../../Functions/FunctionSign/functionAccountAuth";

function PwSearch() {
    //입력 값을 알기 위한 useRef 변수들
    const idRef = useRef();
    const emailRef = useRef();

    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //페이지 처음 렌더링 시 사용자가 이미 로그인한 상태에서 비정상적인 접근(url 접근 등....)을 했는지에 대한 체크를 위한 useEffect
    useEffect(() => {
        if(window.sessionStorage.id) {
            alert("이미 로그인한 상태입니다.");
            navigate("/");
        }
    }, []);

    //계정 인증 버튼 클릭 시 호출되는 이벤트 함수
    const handleAccountAuth = (e) => {
        e.preventDefault();
        functionAccountAuth(idRef, emailRef, navigate);
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handleAccountAuth}>
                <h2>위드리움 비밀번호 찾기</h2>
                <hr></hr>
                <div>
                    <input
                        type="text"
                        placeholder="아이디 입력"
                        ref={idRef}
                        maxLength="12"
                        autoFocus
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        ref={emailRef}
                        maxLength="30"
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div className="signButtonContainer">
                    <Button type="submit" variant="primary" className="formElements">계정 인증</Button>
                </div>
                <hr></hr>
                <div>
                    <span style={{fontSize:"14px"}}>아이디를 잊어버리셨나요? <Link to="/idsearch">아이디 찾기</Link></span><br/>
                    <span style={{fontSize:"14px"}}>위드리움이 처음이신가요? <Link to="/signup">회원가입</Link></span>
                </div>
            </form>
        </div>
    )
}

export default PwSearch;