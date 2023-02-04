//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react hooks
import { useRef } from "react";
//import react router
import { Link, useNavigate } from "react-router-dom"
//import functions
import functionSignIn from "../../Functions/FunctionSign/functionSignIn";
//import atom
import { useSetRecoilState } from "recoil";
import atomNickname from "../../Atoms/atomNickname";

function SignIn() {
    //로그인 시 atom 닉네임 값에 로그인한 계정의 닉네임을 set 해주기 위한 함수 선언
    const setNickname = useSetRecoilState(atomNickname);

    //로그인 시 입력되는 아이디/비밀번호의 ref 변수들 선언
    const idRef = useRef();
    const pwRef = useRef();

    //페이지 이동을 위한 useNavigate 변수
    const navigate = useNavigate();

    //로그인 버튼 클릭 시 백엔드와 통신하는 함수 호출
    const handleSignIn = (e) => {
        e.preventDefault();
        if(idRef.current.value.length > 12) {
            alert("아이디 길이가 12글자 이상입니다!");
        }
        else if(pwRef.current.value.length > 20) {
            alert("비밀번호 길이가 20글자 이상입니다!");
        }
        else {
            functionSignIn(idRef, pwRef, navigate, setNickname);
        }
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handleSignIn}>
                <h2>서일대 계정을 입력하세요</h2>
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
                        type="password"
                        placeholder="비밀번호 입력"
                        ref={pwRef}
                        maxLength="20"
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div className="signButtonContainer">
                    <Button type="submit" variant="primary" className="formElements">로그인</Button>
                </div>
                <div>
                    <span style={{fontSize:"14px"}}>서일대가 처음이신가요? <Link to="/signup">회원가입</Link></span>
                </div>
            </form>
        </div>
    )
}

export default SignIn;