//import css
import "../../css/MyPageCss/LockerPage.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { Button, Card } from 'react-bootstrap';
//import react hooks
import { useEffect, useState } from "react";
//import react router dom
import { useNavigate } from "react-router-dom";
//import functions
import functionGetAccountItemList from "../../Functions/FunctionMyPage/functionGetAccountItemList";
//import image src
import RedHairSrc from "../../Images/RedHair.png";
import BlueHairSrc from "../../Images/BlueHair.png";
import YellowHairSrc from "../../Images/YellowHair.png";
import GrayHairSrc from "../../Images/GrayHair.png";
import PurpleHairSrc from "../../Images/PurpleHair.png";
import HatSrc01 from "../../Images/Hat01.png";
import HatSrc02 from "../../Images/Hat02.png";
import HatSrc03 from "../../Images/Hat03.png";
import BagSrc01 from "../../Images/Bag01.png";
import BagSrc02 from "../../Images/Bag02.png";
import SnowTopSrc from "../../Images/SnowTop.png";
import SnowBottomSrc from "../../Images/SnowBottom.png";
import SnowHatSrc from "../../Images/SnowHat.png";
import RandomBoxCharacterSrc from "../../Images/RandomBoxCharacter.png";
import CharacterSrc01 from "../../Images/Character01.png";
import CharacterSrc02 from "../../Images/Character02.png";
import CharacterSrc03 from "../../Images/Character03.png";
import RandomBoxTopSrc from "../../Images/RandomBoxTop.png";
import RandomBoxBottomSrc from "../../Images/RandomBoxBottom.png";

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
                        divList[2].push([CharacterSrc01, "캐릭터01"]);
                    }
                    else if(userItemList[i] === "ch1") {
                        divList[2].push([CharacterSrc02, "캐릭터02"]);
                    }
                    else if(userItemList[i] === "ch2") {
                        divList[2].push([CharacterSrc03, "캐릭터03"]);
                    }
                    else if(userItemList[i] === "ch3") {
                        divList[0].push([RandomBoxCharacterSrc, "한정 캐릭터"]);
                    }
                    else if(userItemList[i] === "top0") {
                        divList[3].push([SnowTopSrc, "상의01"]);
                    }
                    else if(userItemList[i] === "top1") {
                        divList[1].push([RandomBoxTopSrc, "한정 상의"]);
                    }
                    else if(userItemList[i] === "pants0") {
                        divList[3].push([SnowBottomSrc, "하의01"]);
                    }
                    else if(userItemList[i] === "pants1") {
                        divList[1].push([RandomBoxBottomSrc, "한정 하의"]);
                    }
                    else if(userItemList[i] === "hat0") {
                        divList[3].push([HatSrc01, "토끼 모자"]);
                    }
                    else if(userItemList[i] === "hat1") {
                        divList[3].push([HatSrc02, "호랑이 모자"]);
                    }
                    else if(userItemList[i] === "hat2") {
                        divList[3].push([HatSrc03, "버킷 햇"]);
                    }
                    else if(userItemList[i] === "hat3") {
                        divList[1].push([SnowHatSrc, "한정 모자"]);
                    }
                    else if(userItemList[i] === "bag0") {
                        divList[3].push([BagSrc01, "빨간색 가방"]);
                    }
                    else if(userItemList[i] === "bag1") {
                        divList[3].push([BagSrc02, "갈색 가방"]);
                    }
                    else if(userItemList[i] === "color0") {
                        divList[4].push([RedHairSrc, "빨간 염색약"]);
                    }
                    else if(userItemList[i] === "color1") {
                        divList[4].push([BlueHairSrc, "파란 염색약"]);
                    }
                    else if(userItemList[i] === "color2") {
                        divList[4].push([YellowHairSrc, "노란 염색약"]);
                    }
                    else if(userItemList[i] === "color3") {
                        divList[4].push([GrayHairSrc, "회색 염색약"]);
                    }
                    else if(userItemList[i] === "color4") {
                        divList[4].push([PurpleHairSrc, "보라 염색약"]);
                    }
                }
                setUserDivItemList(divList);
            }
            setLoadingStatus(true);
        }
    }, [userItemList]);

    if(loadingStatus && userItemList.length !== 0) {
        return (
            <div>
                <div className="lockerAllContainer">
                    <h3>랜덤박스 한정 캐릭터</h3>
                    <hr/>
                    <div className="lockerContainer teamManagementContainer">
                    {userDivItemList[0].map((item, index) => (
                        <div className="lockerCardContainer cardContainer" key={index}>
                            <Card>
                                <img className="itemImage Character" src={item[0]}/>
                                <Card.Body>
                                    <Card.Title>{item[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="lockerAllContainer">
                    <h3>랜덤박스 한정 의류</h3>
                    <hr/>
                    <div className="lockerContainer teamManagementContainer">
                    {userDivItemList[1].map((item, index) => (
                        <div className="lockerCardContainer cardContainer" key={index}>
                            <Card>
                                <img className="itemImage" src={item[0]}/>
                                <Card.Body>
                                    <Card.Title>{item[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="lockerAllContainer">
                    <h3>일반 캐릭터</h3>
                    <hr/>
                    <div className="lockerContainer teamManagementContainer">
                    {userDivItemList[2].map((item, index) => (
                        <div className="lockerCardContainer cardContainer" key={index}>
                            <Card>
                                <img className="itemImage Character" src={item[0]}/>
                                <Card.Body>
                                    <Card.Title>{item[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="lockerAllContainer">
                    <h3>일반 의류</h3>
                    <hr/>
                    <div className="lockerContainer teamManagementContainer">
                    {userDivItemList[3].map((item, index) => (
                        <div className="lockerCardContainer cardContainer" key={index}>
                            <Card>
                                <img className="itemImage" src={item[0]}/>
                                <Card.Body>
                                    <Card.Title>{item[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="lockerAllContainer">
                    <h3>머리 염색약</h3>
                    <hr/>
                    <div className="lockerContainer teamManagementContainer">
                    {userDivItemList[4].map((item, index) => (
                        <div className="lockerCardContainer cardContainer" key={index}>
                            <Card>
                                <img className="itemImage" src={item[0]}/>
                                <Card.Body>
                                    <Card.Title>{item[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>
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