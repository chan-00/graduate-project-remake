//import css
import "../../css/PointShopCss/ProductDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { Modal } from "react-bootstrap";
//import react bootstrap icon
import { QuestionCircle } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState, useRef } from "react";
//import react bootstrap
import { useNavigate } from "react-router-dom";
//import functions
import functionUserPoint from "../../Functions/FunctionShop/functionUserPoint";
import functionPurchase from "../../Functions/FunctionShop/functionPurchase";
import functionGetRandomProduct from "../../Functions/FunctionShop/functionGetRandomProduct";
import functionRandomPurchase from "../../Functions/FunctionShop/functionRandomPurchase";
//image src
import RandomBoxSrc from "../../Images/RandomBoxImage.jpg";
import PointSrc from "../../Images/PointImage.png";
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

function ProductDetail() {
    //화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //---접속된 아이템에 따라 화면을 다르게 표시하게 하기 위한 값---
    //제품 이미지 경로
    const [ imageSrc, setImageSrc ] = useState();
    //제품 이름
    const [ productTitle, setProductTitle ] = useState();
    //제품 가격
    const [ productPrice, setProductPrice ] = useState();
    //---접속된 아이템에 따라 화면을 다르게 표시하게 하기 위한 값---

    //유저가 현재 보유하고 있는 포인트 값을 갖고 있을 useState 변수
    const [ userPoint, setUserPoint ] = useState(0);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //현재 선택한 상품의 카테고리
    const [ productCategory, setProductCategory ] = useState();
    //염색약일 경우 어떤 색을 선택했는지에 대한 값
    const [ selectHairColor, setSelectHairColor ] = useState("color0");
    //클릭 상품이 캐릭터일 때와 아닐 때를 비교하여 클래스 이름을 다르게 주어 스타일을 관리하기 위한 값
    const [ clickItemImgClassName, setClickImteImgClassName ] = useState("notCh");

    //랜덤박스 뽑기 시 결과 화면을 띄워 줄 Modal 창의 Boolean useState 변수
    const [ randomResultModalShow, setRandomResultModalShow ] = useState(false);
    //모달 창에 띄울 이미지 src를 담고 있는 useState 변수
    const [ randomResultImageSrc, setRandomResultImageSrc ] = useState();
    //모달 창에 띄울 타이틀을 담고 있는 useState 변수
    const [ randomResultTitle, setRandomResultTitle ] = useState();
    //랜덤박스 결과가 이미 보유하고 있는 아이템이라면 포인트를 환전해 준다는 메시지를 담을 useState 변수
    const [ resultMessage, setResultMessage ] = useState("");
    //랜덤박스의 구성 요소를 알려주는 Modal 창의 Boolean useState 변수
    const [ randomBoxItemModalShow, setRandomBoxItemModalShow ] = useState(false);

    //randombox result Modal 창을 켜고 끄는 함수이다.
    const handleRandomResultModalShow = () => setRandomResultModalShow(true);
    const handleRandomResultModalClose = () => setRandomResultModalShow(false);

    //randombox item 요소를 보여주는 Modal 창을 켜고 끄는 함수이다.
    const handleRandomBoxItemModalShow = () => setRandomBoxItemModalShow(true);
    const handleRandomBoxItemModalClose = () => setRandomBoxItemModalShow(false); 

    //비정상적인 경로 접속 차단과 유저의 보유 포인트 값을 알기 위한 useEffect 함수
    useEffect(() => {
        if(!window.sessionStorage.clickItem && !window.sessionStorage.id) {
            alert("비정상적인 접근입니다!");
            navigate("/shop");
        }
        else if(window.sessionStorage.clickItem && window.sessionStorage.id) {
            functionUserPoint(window.sessionStorage.id, setUserPoint, setLoadingStatus);

            if(window.sessionStorage.clickItem.includes("ch")) {
                setClickImteImgClassName("ch");
            }

            if(window.sessionStorage.clickItem === "ch0") {
                setImageSrc(CharacterSrc01);
                setProductTitle("캐릭터01");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "ch1") {
                setImageSrc(CharacterSrc02);
                setProductTitle("캐릭터02");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "ch2") {
                setImageSrc(CharacterSrc03);
                setProductTitle("캐릭터03");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "top0") {
                setImageSrc(SnowTopSrc);
                setProductTitle("상의");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "pants0") {
                setImageSrc(SnowBottomSrc);
                setProductTitle("하의");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "hat0") {
                setImageSrc(HatSrc01);
                setProductTitle("토끼 모자");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "hat1") {
                setImageSrc(HatSrc02);
                setProductTitle("호랑이 모자");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "hat2") {
                setImageSrc(HatSrc03);
                setProductTitle("버킷 햇");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "bag0") {
                setImageSrc(BagSrc01);
                setProductTitle("빨간색 가방");
                setProductPrice(80);
                setProductCategory("bag");
            }
            else if(window.sessionStorage.clickItem === "bag1") {
                setImageSrc(BagSrc02);
                setProductTitle("갈색 가방");
                setProductPrice(80);
                setProductCategory("bag");
            }
            else if(window.sessionStorage.clickItem === "color") {
                setImageSrc(RedHairSrc);
                setProductTitle("머리 염색약");
                setProductPrice(10);
                setProductCategory("hair color");
            }
            else if(window.sessionStorage.clickItem === "randomBox") {
                setImageSrc(RandomBoxSrc);
                setProductTitle("랜덤박스");
                setProductPrice(50);
                setProductCategory("random box");
            }
        }
    }, []);

    //구매 버튼 클릭 시 호출되는 이벤트 함수
    const handlePurchase = () => {
        if(userPoint - productPrice >= 0 && window.sessionStorage.clickItem !== "randomBox") {
            if(productCategory === "character") {
                functionPurchase(productPrice, window.sessionStorage.id, window.sessionStorage.clickItem, productCategory, navigate);
            }
            else {
                if(window.sessionStorage.clickItem === "color") {
                    functionPurchase(productPrice, window.sessionStorage.id, selectHairColor, "outfit", navigate);
                }
                else {
                    functionPurchase(productPrice, window.sessionStorage.id, window.sessionStorage.clickItem, "outfit", navigate);
                }
            }
        }
        else if(userPoint - productPrice >= 0 && window.sessionStorage.clickItem === "randomBox") {
            const randomResult = functionGetRandomProduct();

            if(randomResult === "ch0") {
                setRandomResultImageSrc(CharacterSrc01);
                setRandomResultTitle("캐릭터01");
            }
            else if(randomResult === "ch1") {
                setRandomResultImageSrc(CharacterSrc02);
                setRandomResultTitle("캐릭터02");
            }
            else if(randomResult === "ch2") {
                setRandomResultImageSrc(CharacterSrc03);
                setRandomResultTitle("캐릭터03");
            }
            else if(randomResult === "ch3") {
                setRandomResultImageSrc(RandomBoxCharacterSrc);
                setRandomResultTitle("랜덤박스 한정 캐릭터");
            }
            else if(randomResult === "top0") {
                setRandomResultImageSrc(SnowTopSrc);
                setRandomResultTitle("상의01");
            }
            else if(randomResult === "top1") {
                setRandomResultImageSrc(RandomBoxTopSrc);
                setRandomResultTitle("랜덤박스 한정 상의");
            }
            else if(randomResult === "pants0") {
                setRandomResultImageSrc(SnowBottomSrc);
                setRandomResultTitle("하의01");
            }
            else if(randomResult === "pants1") {
                setRandomResultImageSrc(RandomBoxBottomSrc);
                setRandomResultTitle("랜덤박스 한정 하의");
            }
            else if(randomResult === "hat0") {
                setRandomResultImageSrc(HatSrc01);
                setRandomResultTitle("토끼 모자");
            }
            else if(randomResult === "hat1") {
                setRandomResultImageSrc(HatSrc02);
                setRandomResultTitle("호랑이 모자");
            }
            else if(randomResult === "hat2") {
                setRandomResultImageSrc(HatSrc03);
                setRandomResultTitle("버킷 햇");
            }
            else if(randomResult === "hat3") {
                setRandomResultImageSrc(SnowHatSrc);
                setRandomResultTitle("랜덤박스 한정 모자");
            }
            else if(randomResult === "bag0") {
                setRandomResultImageSrc(BagSrc01);
                setRandomResultTitle("빨간색 가방");
            }
            else if(randomResult === "bag1") {
                setRandomResultImageSrc(BagSrc02);
                setRandomResultTitle("갈색 가방");
            }
            else if(randomResult === "150" || randomResult === "50" || randomResult === "30" || randomResult === "10") {
                setRandomResultImageSrc(PointSrc);
                setRandomResultTitle(randomResult + "p");
            }

            //랜덤박스 결과 포인트가 나왔다면 카테고리를 Point로 해서 백엔드로 전송
            if(randomResult === "150" || randomResult === "50" || randomResult === "30" || randomResult === "10") {
                functionRandomPurchase(window.sessionStorage.id, randomResult, "Point", setResultMessage, handleRandomResultModalShow, setUserPoint);
            }
            else if(randomResult === "ch0" || randomResult === "ch1" || randomResult === "ch2" || randomResult === "ch3") {
                functionRandomPurchase(window.sessionStorage.id, randomResult, "character", setResultMessage, handleRandomResultModalShow, setUserPoint);
            }
            else {
                functionRandomPurchase(window.sessionStorage.id, randomResult, "outfit", setResultMessage, handleRandomResultModalShow, setUserPoint);
            }
        }
        else if(userPoint - productPrice < 0) {
            alert("현재 보유한 포인트가 부족하여 구매할 수 없습니다.");
        }
    }

    //염색약 고를 때 색 바뀔 때마다 호출되는 이벤트 함수
    const handleChangeHairColor = (e) => {
        const hairColor = e.target.value;
        setSelectHairColor(hairColor);
        if(hairColor === "color0") {
            setImageSrc(RedHairSrc);
        }
        else if(hairColor === "color1") {
            setImageSrc(GrayHairSrc);
        }
        else if(hairColor === "color2") {
            setImageSrc(BlueHairSrc);
        }
        else if(hairColor === "color3") {
            setImageSrc(YellowHairSrc);
        }
        else if(hairColor === "color4") {
            setImageSrc(PurpleHairSrc);
        }
    }
    
    if(loadingStatus) {
        return (
            <div id="productDetailAllContainer">
                <div id="productDetailContainer">
                    <img src={imageSrc} className={clickItemImgClassName}/>
                    <div>
                        <h3 style={{display:"inline-block"}}>{productTitle}</h3>
                        {window.sessionStorage.clickItem === "randomBox"
                        ? 
                        <div id="randomBoxItemQuestion" onClick={() => handleRandomBoxItemModalShow()}>
                            <QuestionCircle/>
                            <span>랜덤박스 구성 요소</span>
                        </div>
                        : null}
                        {window.sessionStorage.clickItem === "color" ? 
                            <select onChange={handleChangeHairColor}>
                                <option value="color0">빨간색</option>
                                <option value="color1">회색</option>
                                <option value="color2">파란색</option>
                                <option value="color3">노란색</option>
                                <option value="color4">보라색</option>
                            </select>
                        : null}
                        <hr/>
                        <p>가격</p>
                        <span>{productPrice}p</span>
                        <p>보유 포인트</p>
                        <span>{userPoint}p</span>
                        <p>잔액</p>
                        <span>{userPoint - productPrice}p</span>

                        <button onClick={handlePurchase}>구매 &gt;</button>
                        <div>
                            <p>상품 카테고리 : {productCategory}</p>
                        </div>
                    </div>
                </div>
                <Modal show={randomResultModalShow} onHide={handleRandomResultModalClose}>
                    <Modal.Header closeButton>
                        <h4>Random Box Result</h4>
                    </Modal.Header>
                    <Modal.Body id="randomResultModalContainer">
                        <img src={randomResultImageSrc}/>
                        <p style={{marginTop: "1rem"}}>{randomResultTitle} 제품을 휙득했습니다!</p>
                        {resultMessage.length !== 0 ? <p>{resultMessage}</p> : null}
                    </Modal.Body>
                </Modal>
                <Modal show={randomBoxItemModalShow} onHide={handleRandomBoxItemModalClose}>
                    <Modal.Header closeButton>
                        <h4>RandomBox 확률</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <p>랜덤박스 한정 캐릭터(2%)</p>
                        <p>랜덤박스 한정 아이템(모자, 상의, 하의)(6%)</p>
                        <p>일반 캐릭터(3%)</p>
                        <p>일반 아이템(모자, 상의, 하의, 가방)(21%)</p>
                        <p>150p(2%), 50p(10%), 30p(30%), 10p(20%)</p>
                    </Modal.Body>
                </Modal>
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

export default ProductDetail;