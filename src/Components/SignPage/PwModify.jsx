//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react router
import { Link, useNavigate } from "react-router-dom"
//import react hooks
import { useRef, useState, useEffect } from "react";
//import functions

function PwModify() {
    //입력 값을 알기 위한 useRef 변수들
    const pwRef = useRef();
    const pwCheckRef = useRef();

    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //페이지 첫 렌더링 시 비정상적인 접근일 경우를 차단하기 위한 useEffect 함수
    useEffect(() => {

    }, []);

    //비밀번호 재설정 이벤트 발생 시 호출되는 이벤트 함수
    const handlePasswordModify = (e) => {
        e.preventDefault();
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handlePasswordModify}>
                <h2>서일대 비밀번호 재설정</h2>
                <hr></hr>
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
                <hr></hr>
                <div>
                    <span style={{fontSize:"14px"}}>아이디를 잊어버리셨나요? <Link to="/idsearch">아이디 찾기</Link></span><br/>
                    <span style={{fontSize:"14px"}}>서일대가 처음이신가요? <Link to="/signup">회원가입</Link></span>
                </div>
            </form>
        </div>
    );
}

export default PwModify;