
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
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
        if(userItemList !== undefined) {
            if(userItemList.length !== 0) {
                const divList = [[], [], [], [], []];

                for(let i = 0; i < userItemList.length; i++) {
                    if(userItemList[i] === "ch0") {
                        divList[2].push(["https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg", "캐릭터01"]);
                    }
                    else if(userItemList[i] === "ch1") {
                        divList[2].push(["https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg", "캐릭터02"]);
                    }
                    else if(userItemList[i] === "ch2") {
                        divList[2].push(["https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg", "캐릭터03"]);
                    }
                    else if(userItemList[i] === "ch3") {
                        divList[0].push(["https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg", "한정 캐릭터"]);
                    }
                    else if(userItemList[i] === "top0") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png", "상의01"]);
                    }
                    else if(userItemList[i] === "top1") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png", "상의02"]);
                    }
                    else if(userItemList[i] === "top2") {
                        divList[1].push(["https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png", "한정 상의"]);
                    }
                    else if(userItemList[i] === "pants0") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg", "하의01"]);
                    }
                    else if(userItemList[i] === "pants1") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg", "하의02"]);
                    }
                    else if(userItemList[i] === "pants2") {
                        divList[1].push(["https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg", "한정 하의"]);
                    }
                    else if(userItemList[i] === "hat0") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg", "모자01"]);
                    }
                    else if(userItemList[i] === "hat1") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg", "모자02"]);
                    }
                    else if(userItemList[i] === "hat2") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg", "모자03"]);
                    }
                    else if(userItemList[i] === "hat3") {
                        divList[1].push(["https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg", "한정 모자"]);
                    }
                    else if(userItemList[i] === "bag0") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg", "가방01"]);
                    }
                    else if(userItemList[i] === "bag1") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg", "가방02"]);
                    }
                    else if(userItemList[i] === "bag2") {
                        divList[1].push(["https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg", "한정 가방"]);
                    }
                    else if(userItemList[i] === "shoes0") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg", "신발01"]);
                    }
                    else if(userItemList[i] === "shoes1") {
                        divList[3].push(["https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg", "신발02"]);
                    }
                    else if(userItemList[i] === "shoes2") {
                        divList[1].push(["https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg", "한정 신발"]);
                    }
                    else if(userItemList[i] === "color0") {
                        divList[4].push(["https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg", "빨간 염색약"]);
                    }
                    else if(userItemList[i] === "color1") {
                        divList[4].push(["https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg", "초록 염색약"]);
                    }
                    else if(userItemList[i] === "color2") {
                        divList[4].push(["https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg", "파란 염색약"]);
                    }
                    else if(userItemList[i] === "color3") {
                        divList[4].push(["https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg", "검정 염색약"]);
                    }
                    else if(userItemList[i] === "color4") {
                        divList[4].push(["https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg", "하얀 염색약"]);
                    }
                }
                setUserDivItemList(divList);
                setLoadingStatus(true);
            }
            
        }
    }, [userItemList]);

    console.log(userDivItemList);

    if(loadingStatus && userItemList.length !== 0) {
        return (
            <div>
                보관함 페이지입니다~
            </div>
        )
    }
    else if(loadingStatus && userItemList.length === 0) {
        return (
            <div id="teamMainAllContainer" style={{textAlign:"center"}}>
                <p id="teamBelongNoneMessage">구매한 상품이 없습니다.</p>
                <Button variant="outline-primary" className='teamBelongNoneBtn' onClick={() => {navigate("/shop")}}>상점 페이지로 이동</Button>
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