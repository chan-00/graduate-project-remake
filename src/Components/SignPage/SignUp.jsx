//import sign css
import "../../css/SignPageCss/Sign.css";
//import react bootstrap
import { Button } from "react-bootstrap";
//import react hooks
import { useEffect, useRef, useState } from "react";
//import react router
import { useNavigate } from "react-router-dom"
//import functions
import functionSignUp from "../../Functions/FunctionSign/functionSignUp";
import functionIdCheck from "../../Functions/FunctionSign/functionIdCheck";
import functionEmailAuth from "../../Functions/FunctionSign/functionEmailAuth";
//import atom
import { useSetRecoilState } from "recoil";
import atomNickname from "../../Atoms/atomNickname";

function SignUp() {
    //회원가입 시 atom 닉네임 값에 회원가입한 계정의 닉네임을 set 해주기 위한 함수 선언
    const setNickname = useSetRecoilState(atomNickname);

    //회원가입 시 입력되는 데이터의 ref 변수들 선언
    const idRef = useRef();
    const pwRef = useRef();
    const pwCheckRef = useRef();
    const emailRef = useRef();
    const emailAuthRef = useRef();
    const nicknameRef = useRef();
    //아이디 중복 버튼으로 아이디 중복 여부를 검사해야 회원가입 버튼을 누를 수 있도록 회원가입 버튼에 연결할 useRef 변수
    const signupRef = useRef();

    //사용자가 입력한 아이디 값이 중복인지 아닌지를 표현하는 useState 변수
    const [ idCheckMessage, setIdCheckMessage ] = useState("");
    //회원가입 버튼의 활성화/비활성화 여부를 다루는 useState 변수
    const [ signBtnActivation, setSignBtnActivation ] = useState(true);
    //아이디 중복 체크 성공 시 성공에 대한 boolean 값을 갖고 있는 useState 변수
    const [ idCheckSuccess, setIdCheckSuccess ] = useState(false);
    //이메일 인증 성공 시 성공에 대한 boolean 값을 갖고 있는 useState 변수
    const [ emailAuthSuccess, setEmailAuthSuccess ] = useState(false);
    //이메일 인증 버튼 클릭 시 백엔드로부터 받아 온 이메일 인증용 랜덤 숫자값을 저장할 useState 변수
    const [ randEmailAuthNumber, setRandEmailAuthNumber ] = useState("");
    //이메일 인증 버튼 클릭 후 랜덤 숫자값을 받아 오는데 성공하면 인증 번호를 입력하는 칸을 보여주는 boolean useState 변수
    const [ emailAuthInputShow, setEmailAuthInputShow ] = useState(false);

    //회원가입 성공 시 메인 페이지로 가게 하기 위한 useNavigate 변수 선언
    const navigate = useNavigate();

    //회원가입 버튼 활성화/비활성화를 위한 useEffect 함수(활성화/비활성화 여부를 담고 있는 signBtnActivation 값이 바뀔 때마다 버튼의 disabled 값을 바꾼다.)
    useEffect(() => {
        if(idCheckSuccess && emailAuthSuccess) {
            signupRef.current.disabled = false;
        }
        else {
            signupRef.current.disabled = true;
        }
    }, [idCheckSuccess, emailAuthSuccess]);

    //아이디 중복 버튼 클릭 시 백엔드와 통신하는 함수 호출
    const handleIdCheck = (e) => {
        e.preventDefault();
        if(idRef.current.value.length > 12 || idRef.current.value.length === 0) {
            alert("아이디가 12글자 이상이거나 입력하지 않았습니다.");
        }
        else {
            functionIdCheck(idRef, setIdCheckMessage, setIdCheckSuccess);
        }
    }

    //회원가입 버튼 클릭 시 백엔드와 통신하는 함수 호출
    const handleSignUp = (e) => {
        e.preventDefault();

        if(idRef.current.value.length > 12 || idRef.current.value.length === 0) {
            alert("아이디가 12글자 이상이거나 입력하지 않았습니다.");
        }
        else if(pwRef.current.value.length > 20 || pwRef.current.value.length === 0) {
            alert("비밀번호가 20글자 이상이거나 입력하지 않았습니다.");
        }
        else if(pwCheckRef.current.value.length > 20 || pwCheckRef.current.value.length === 0) {
            alert("비밀번호 확인 글자가 20글자 이상이거나 입력하지 않았습니다.");
        }
        else if(emailRef.current.value.length > 30 || emailRef.current.value.length === 0) {
            alert("이메일이 30글자 이상이거나 입력하지 않았습니다.");
        }
        else if(nicknameRef.current.value.length > 20 || nicknameRef.current.value.length === 0) {
            alert("닉네임이 20글자 이상이거나 입력하지 않았습니다.");
        }
        else {
            functionSignUp(idRef, pwRef, pwCheckRef, emailRef, nicknameRef, navigate, setNickname);
        }
    }

    //이메일 인증 버튼 클릭 시 호출되는 이벤트 함수
    const handleEmailAuth = () => {
        if(emailRef.current.value.length > 30 || emailRef.current.value.length === 0) {
            alert("이메일이 30글자 이상이거나 입력하지 않았습니다.");
        }
        else {
            alert("해당 메일로 인증 번호가 전송되었습니다.");
            functionEmailAuth(emailRef, setRandEmailAuthNumber, setEmailAuthInputShow);
        }
    }

    //인증 번호 입력 후 확인 버튼 클릭 시 호출되는 이벤트 함수
    const handleAuthNumberCheck = () => {
        if(emailAuthRef.current.value === randEmailAuthNumber) {
            alert("이메일 인증에 성공하였습니다.");
            setEmailAuthSuccess(true);
        }
        else {
            alert("인증 번호가 다릅니다, 다시 한번 확인해주세요.");
            setEmailAuthSuccess(false);
        }
    }

    return (
        <div className="signAllContainer">
            <form className="signContainer" onSubmit={handleSignUp}>
                <h2>위드리움 회원가입</h2>
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
                    <Button variant="outline-primary" className="formElements" style={{width:"150px", marginRight:"10px", height:"35px", fontSize:"14px"}} onClick={handleIdCheck}>아이디 중복확인</Button>
                    <span style={{fontSize:"14px"}}>{idCheckMessage}</span>
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
                <div id="emailInputContainer">
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        ref={emailRef}
                        maxLength="30"
                        required
                        className="formElements inputElements"
                    />
                    <Button variant="outline-primary" className="formElements" style={{width:"37%", marginBottom:"5px" ,height:"42px", fontSize:"14px"}} onClick={handleEmailAuth}>이메일 인증</Button>
                </div>
                {emailAuthInputShow ? 
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
                </div> : null}
                <div>
                    <input
                        type="text"
                        placeholder="닉네임 입력"
                        ref={nicknameRef}
                        maxLength="20"
                        required
                        className="formElements inputElements"
                    />
                </div>
                <div className="signButtonContainer">
                    <Button type="submit" variant="primary" className="formElements" ref={signupRef}>회원가입</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;