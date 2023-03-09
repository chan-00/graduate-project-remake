
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState } from "react";
//import react router dom
import { useNavigate } from "react-router-dom";
//import functions
import functionGetAccountItemList from "../../Functions/FunctionMyPage/functionGetAccountItemList";

function LockerPage() {
    //페이지 이동을 위한 useNavigate 사용
    const navigate = useNavigate();

    //백엔드로부터 받아온 데이터를 1차적으로 저장할 useState 변수
    const [ userItemList, setUserItemList ] = useState();
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);

    //유저 아이템 리스트들을 구분하여 담아 놓을 useState 변수
    const [ userDivItemList, setUserDivItemList ] = useState();

    //보관함 첫 렌더링 시 해당 계정이 보유하고 있는 아이템 리스트를 받아 오기 위한 useEffect 함수
    useEffect(() => {
        if(window.sessionStorage.id) {
            functionGetAccountItemList(window.sessionStorage.id, setUserItemList);
        }
        else if(!window.sessionStorage.id) {
            alert("비정상적인 접근입니다!");
            navigate("/");
        }
    }, []);
    //백엔드로부터 아이템 리스트를 받아 온 후 해당 아이템 리스트를 종류별로 구분하기 위한 useEffect 함수
    useEffect(() => {
        if(userItemList.length !== 0) {
            const divList = [[], [], [], [], []];

            for(let i = 0; i < userItemList.length; i++) {
                
            }
        }
        
    }, [userItemList]);

    if(loadingStatus && userItemList.length !== 0) {
        return (
            <div>
                보관함 페이지입니다~
            </div>
        )
    }
    else if(loadingStatus && userItemList.length === 0) {
        return (
            <div>
                보관함 페이지입니다~
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id='boardDetailAllContainer' style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
    
}

export default LockerPage;